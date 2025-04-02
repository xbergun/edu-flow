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
import DeleteHelper from "eduflowui/utils/odata_helpers/DeleteHelper";
import CreateHelper from "eduflowui/utils/odata_helpers/CreateHelper";
/**
 * @namespace eduflowui.controller
 */
export default class Dashboard extends BaseController {
    private auth0_Id!: string;
    private tableBuilder!: TableBuilder;
    private dialogBuilder!: DialogBuilder;
    private oDataDeleteHelper!: DeleteHelper;
    private oDataCreateHelper!: CreateHelper;
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
        this.oDataDeleteHelper = new DeleteHelper(model);
        this.oDataCreateHelper = new CreateHelper(model);
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


    public async onAddCourseButtonPress(): Promise<void> {

        const formData = await this.dialogBuilder.addNewCourseByUserDialog();

        if (formData) {
            try {
                await this.oDataCreateHelper.addNewUserCourse(formData, this.auth0_Id).then(() => {
                    this.bindUserCourses();
                    MessageToast.show("Course added successfully");
                });
            } catch (error) {
                console.error("❌", error);
                MessageToast.show("Error adding course");
            }
        }
    }

    public async onDeleteCoursesButtonPress(): Promise<void> {
        const table = this.getCurrentView().byId("idUserCoursesTable") as Table;
        try {
            await this.oDataDeleteHelper.deleteUserCourses(table).then(() => {
                this.bindCurrentCredits();
                MessageToast.show("Courses deleted successfully");
            });
        } catch (error) {
            console.error("❌", error);
            MessageToast.show("Error deleting courses");
        }

    }

}