import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { ApplicationModels, IAuth0Config, ICredits, Routes } from "eduflowui/types/global.types";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Table from "sap/m/Table";
import Component from "eduflowui/Component";
import TableBuilder from "eduflowui/utils/generic_builders/TableBuilder";
import DialogBuilder from "eduflowui/utils/generic_builders/DialogBuilder";
/**
 * @namespace eduflowui.controller
 */
export default class Dashboard extends BaseController {
    private auth0_Id!: string;
    private tableBuilder!: TableBuilder;
    private dialogBuilder!: DialogBuilder;
    private model!: ODataModel;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
        const view = this.getCurrentView();
        const user = this.getLoggedInUserData();

        this.model = model;
        this.auth0_Id = user.Auth0Id;
        this.tableBuilder = new TableBuilder(view, model);
        this.dialogBuilder = new DialogBuilder(view);

        this.bindUserCourses()
    }

    private bindUserCourses(): void {
        const path = `/UserCourses(user_auth0_ID='${this.auth0_Id}')`;

        this.tableBuilder.bindUserCourses(path, this.auth0_Id).then(() => {
            this.bindCurrentCredits();
        });
    }

    private bindCurrentCredits(): void {
        const currentCreditsModel = this.getOwnerComponent()?.getModel("currentCredits") as JSONModel;


        this.model.callFunction("/getCurrentCreditsByStudent", {
            method: "GET",
            urlParameters: {
                auth0_ID: this.auth0_Id
            },
            success: (data: { getCurrentCreditsByStudent: ICredits }) => {
                console.log("✅", data.getCurrentCreditsByStudent);
                currentCreditsModel.setData(data.getCurrentCreditsByStudent);
            },
            error: (error: any) => {
                console.error("❌", error);
            }
        });

    }

    private async onAddCourseButtonPress(): Promise<void> {
        const formData = await this.dialogBuilder.addNewCourseByUserDialog();
    }

}