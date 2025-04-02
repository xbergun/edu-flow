import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { Routes } from "eduflowui/types/global.types";
import Table from "sap/m/Table";
import DialogBuilder from '../utils/generic_builders/DialogBuilder';
import Event from "sap/ui/base/Event";
import Context from "sap/ui/model/Context";
import ListItemBase, { ListItemBase$PressEventParameters } from "sap/m/ListItemBase";
import ColumnListItem from "sap/m/ColumnListItem";
import Component from "eduflowui/Component";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import TableBuilder from "eduflowui/utils/generic_builders/TableBuilder";
import MessageToast from 'sap/m/MessageToast';
import Chart from "sap/chart/Chart";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

/**
 * @namespace eduflowui.controller
 */
export default class CourseDetail extends BaseController {
    private model!: ODataModel;
    private auth0_Id!: string;
    private courseId!: string;
    private courseName!: string;
    private tableBuilder!: TableBuilder;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
        const view = this.getCurrentView();
        const user = this.getLoggedInUserData();

        this.model = model;
        this.auth0_Id = user.Auth0Id;
        this.tableBuilder = new TableBuilder(view, model);

        this.getRouter().getRoute("RouteCourseDetail")!.attachMatched(this.onObjectMatched, this);

    }


    private onObjectMatched(event: Route$PatternMatchedEvent): void {
        const routeParams = (event.getParameters().arguments as {
            courseId: string,
            courseName: string,
        });
        this.courseId = routeParams.courseId;
        this.courseName = routeParams.courseName;
        this.bindCourseUsers();
        this.bindChartData();
    }

    private bindChartData(): void {
        const chart = this.byId("idCourseDetailRegistrationChart") as any;

        const filters = [
            new Filter("course_ID", FilterOperator.EQ, this.courseId)
        ]

        chart.setModel(this.getView()?.getModel());
        chart.rebindChart(filters); 
    }


    private bindCourseUsers(): void {
        this.tableBuilder.bindCourseUsers(this.courseId);
    }

    public onSaveChangesButtonPress(event: Event): void {
        const oModel = this.getView()?.getModel() as ODataModel;
        oModel.submitChanges({
            success: () => {
                MessageToast.show("Changes saved successfully.");
            },
            error: () => {
                MessageToast.show("Error saving changes.");
            }
        });
    }


}
