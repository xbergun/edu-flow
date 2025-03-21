import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { Routes } from "eduflowui/types/global.types";
import Table from "sap/m/Table";
import DialogBuilder from '../utils/generic_builders/DialogBuilder';
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/Context";
import ListItemBase, { ListItemBase$PressEventParameters } from "sap/m/ListItemBase";
import ColumnListItem from "sap/m/ColumnListItem";

/**
 * @namespace eduflowui.controller
 */
export default class Courses extends BaseController {
    private dialogBuilder!: DialogBuilder;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const view = this.getCurrentView();
        this.dialogBuilder = new DialogBuilder(view);
    }

    public onAddCourseButtonPress(): void {
        this.dialogBuilder.addNewCourseDialog();
    }

    public onColumnListItemPress(event: Event<ListItemBase$PressEventParameters, ColumnListItem>) {
        const courseParams = ((event.getSource() as ListItemBase).getBindingContext() as Context).getObject() as { ID: string, name: string };

        this.getRouter().navTo("RouteCourseDetail", {
            courseId: courseParams.ID,
            courseName: courseParams.name
        });
    }
}