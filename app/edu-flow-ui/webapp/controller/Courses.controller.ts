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
import SmartTable, { SmartTable$BeforeRebindTableEvent } from "sap/ui/comp/smarttable/SmartTable";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import JSONModel from "sap/ui/model/json/JSONModel";
import CreateHelper from "eduflowui/utils/odata_helpers/CreateHelper";
/**
 * @namespace eduflowui.controller
 */
export default class Courses extends BaseController {
    private dialogBuilder!: DialogBuilder;
    private oDataDeleteHelper!: DeleteHelper;
    private oDataCreateHelper!: CreateHelper;
    private auth0_Id!: string;
    private programName!: string;
    private smartTable!: SmartTable;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
        const user = this.getLoggedInUserData();

        this.auth0_Id = user.Auth0Id;
        this.programName = user.ProgramName;

        const view = this.getCurrentView();
        this.dialogBuilder = new DialogBuilder(view);
        this.oDataDeleteHelper = new DeleteHelper(model);
        this.oDataCreateHelper = new CreateHelper(model);
        this.smartTable = this.byId("stCourses") as SmartTable;
        this.setCoursesBinding();
    }

    public onLogoutButtonPress(): void {
        return this.onLogOutButtonPress();
    }

    private setCoursesBinding(): void {
        const smartTable = this.smartTable;
        const component = this.getOwnerComponent() as Component;
        const user = this.getLoggedInUserData();

        const oDataModel = component.getModel() as ODataModel;
        oDataModel.setHeaders({
            "x-auth0-id": user.Auth0Id 
        });
    
        smartTable.attachBeforeRebindTable((Event: SmartTable$BeforeRebindTableEvent) => {
            const bindingParams = Event.getParameter("bindingParams") as { filters: Filter[] };
            if (bindingParams) {
                const filter = new Filter("to_Teacher/auth0_ID", FilterOperator.EQ, `'${user.Auth0Id}'`);
                bindingParams.filters.push(filter);
            }
        });
    
        smartTable.attachEventOnce("initialise", () => {
            smartTable.rebindTable(true);
        });

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
            await this.oDataCreateHelper.createCourse(formData, this.auth0_Id, this.programName).finally(() => { 
                this.smartTable.rebindTable(true);
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
    