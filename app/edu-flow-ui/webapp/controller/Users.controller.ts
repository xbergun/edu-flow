import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
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
import formatter from "../model/formatter";
/**
 * @namespace eduflowui.controller
 */
export default class Users extends BaseController {
    public formatter = formatter;
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onColumnListItemPress(event: Event<ListItemBase$PressEventParameters, ColumnListItem>) {
        const userParams = ((event.getSource() as ListItemBase).getBindingContext() as Context).getObject() as { ID: string, fullName: string };

        this.getRouter().navTo("RouteUserDetail", {
            userId: userParams.ID
        });
    }
}