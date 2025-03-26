import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import Core from "sap/ui/core/Core";
import { ApplicationModels, IAuth0 } from "./types/global.types";

/**
 * @namespace eduflowui
 */
export default class Component extends BaseComponent {

    public static metadata = {
        manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
    };

    public init(): void {
        // call the base component's init function
        super.init();

        // set the device model
        this.setModel(createDeviceModel(), "device");

        this.fetchAuth0Keys();

        // enable routing
        this.getRouter().initialize();
    }

    private async fetchAuth0Keys(): Promise<void> {
        const oModel = this.getModel() as ODataModel;

        oModel.callFunction("/getAuth0Keys", {
            method: "GET",
            success: (data: { getAuth0Keys: IAuth0 }) => {
                if (data?.getAuth0Keys) {
                    const auth0Model = new JSONModel(data.getAuth0Keys);
                    this.setModel(auth0Model, ApplicationModels.AUTH0);
                }
            },
            error: (error: any) => {
                console.error("❌", error);
            }
        });
    }

}