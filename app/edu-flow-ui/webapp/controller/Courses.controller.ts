import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { Routes } from "eduflowui/types/global.types";
import Table from "sap/m/Table";
import DialogBuilder from '../utils/generic_builders/DialogBuilder';
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/Context";
import ListItemBase, { ListItemBase$PressEventParameters } from "sap/m/ListItemBase";
import ColumnListItem from "sap/m/ColumnListItem";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MessageToast from "sap/m/MessageToast";
import DeleteHelper from "eduflowui/utils/odata_helpers/DeleteHelper";
import Component from "../Component";
/**
 * @namespace eduflowui.controller
 */
export default class Courses extends BaseController {
    private dialogBuilder!: DialogBuilder;
    private oDataDeleteHelper!: DeleteHelper;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
        const view = this.getCurrentView();
        this.dialogBuilder = new DialogBuilder(view);
        this.oDataDeleteHelper = new DeleteHelper(model);
    }

    public onColumnListItemPress(event: Event<ListItemBase$PressEventParameters, ColumnListItem>) {
        const courseParams = ((event.getSource() as ListItemBase).getBindingContext() as Context).getObject() as { ID: string, name: string };

        this.getRouter().navTo("RouteCourseDetail", {
            courseId: courseParams.ID,
            courseName: courseParams.name
        });
    }

    public async onAddCourseButtonPress(): Promise<void> {
        const formData = await this.dialogBuilder.addNewCourseDialog();
    
        if (!formData) {
            return;
        }
    
        try {
            const oDataModel = this.getCurrentView().getModel() as ODataModel;
    
            await new Promise<void>((resolve, reject) => {
                oDataModel.create("/Courses", formData, {
                    success: () => {
                        MessageToast.show("Course created successfully.");
                        oDataModel.refresh(true);
                        resolve();
                    },
                    error: (err:any) => {
                        MessageToast.show("Error creating course.");
                        console.error(err);
                        reject(err);
                    }
                });
            });
    
        } catch (error) {
            console.error("Unexpected error while creating course:", error);
        }
    }

    public async onDeleteCourseButtonPress (event: Event): Promise<void> {
        const table = this.getCurrentView().byId("idCoursesTable") as Table;
        try {
            await this.oDataDeleteHelper.deleteCourses(table);
        } catch (error) {
            console.error("Error deleting product species:", error);
        }
    }
}
    