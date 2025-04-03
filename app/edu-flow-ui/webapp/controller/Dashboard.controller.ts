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
import Filter from 'sap/ui/model/Filter';
import ReadHelper from "eduflowui/utils/odata_helpers/ReadHelper";
/**
 * @namespace eduflowui.controller
 */
export default class Dashboard extends BaseController {
    private auth0_Id!: string;
    private tableBuilder!: TableBuilder;
    private dialogBuilder!: DialogBuilder;
    private oDataDeleteHelper!: DeleteHelper;
    private oDataCreateHelper!: CreateHelper;
    private oDataReadHelper!: ReadHelper;
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
        this.oDataReadHelper = new ReadHelper(model);
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
                await this.checkCurrentCredits(formData.course_ID);
                await this.oDataCreateHelper.addNewUserCourse(formData, this.auth0_Id);
                this.bindUserCourses();
                MessageToast.show("Course added successfully");
            } catch (error: Error | any) {
                console.error("❌", error);
                MessageToast.show(error.message || "Error adding course");
            }
        }
    }

    private async checkCurrentCredits(course_ID: string): Promise<void> {
        const currentCreditsModel = this.getOwnerComponent()?.getModel("currentCredits") as JSONModel;
        const currentCredits = currentCreditsModel.getData() as ICredits;

        const path = `/VHCourses(ID=guid'${course_ID}')`;

        const course = await this.oDataReadHelper.readAsync(path);

        const courseCredit = course.credits;

        if (currentCredits.currentCredits + courseCredit > currentCredits.maxCredits) {
            throw new Error("Maximum credits exceeded");
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