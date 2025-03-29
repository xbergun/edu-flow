import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { ApplicationModels, IAuth0Config, Routes } from "eduflowui/types/global.types";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import Table from "sap/m/Table";
import Component from "eduflowui/Component";
import TableBuilder from "eduflowui/utils/generic_builders/TableBuilder";
/**
 * @namespace eduflowui.controller
 */
export default class Dashboard extends BaseController {
    private auth0_Id!: string;
    private tableBuilder!: TableBuilder;



    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
        const view = this.getCurrentView();
        const user = this.getLoggedInUserData();

        this.auth0_Id = user.Auth0Id;
        this.tableBuilder = new TableBuilder(view, model);

        this.bindUserCourses()
    }

    private bindUserCourses(): void {
        const path = `/UserCourses(user_auth0_ID='${this.auth0_Id}')`;
        console.log(path);

       
        this.tableBuilder.bindUserCourses(path, this.auth0_Id);
    }

}