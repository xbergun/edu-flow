import Controller from "sap/ui/core/mvc/Controller";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import BaseController from "./BaseController";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
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
import Input from "sap/m/Input";
import JSONModel from "sap/ui/model/json/JSONModel";
import BusyIndicator from "sap/ui/core/BusyIndicator";
/**
 * @namespace eduflowui.controller
 */
export default class UserDetail extends BaseController {
    private userId: string = "";
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
        const view = this.getCurrentView();

        this.getRouter().getRoute("RouteUserDetail")!.attachMatched(this.onObjectMatched, this);
    }

    private onObjectMatched(event: Route$PatternMatchedEvent): void {
        const routeParams = (event.getParameters().arguments as {
            userId: string;
        });
        this.userId = routeParams.userId;

        this.bindUserCourses2();
    }

    private bindUserCourses(): void {
        const view = this.getCurrentView();
        const model = view.getModel() as ODataModel;
        const smartForm = view.byId("idUserCoursesTable") as Table;
        BusyIndicator.show();
        model.callFunction("/getUserCourses", {
            method: "GET",
            urlParameters: {
                user_ID: this.userId,
            },
            success: (data: any) => {
                const results = data?.results ?? [];
    
                const jsonModel = new JSONModel({ courses: results });
                view.setModel(jsonModel, "userCourses");
    
                smartForm.unbindAggregation("items", true);
    
                smartForm.bindAggregation("items", {
                    path: "userCourses>/courses",
                    template: new ColumnListItem({
                        cells: [
                            new Input({ value: "{userCourses>letterGrade}" }),
                            new Input({ value: "{userCourses>absenceCount}" })
                        ]
                    })
                });
                BusyIndicator.hide();
                
            },
            error: (error: any) => {
                console.error("Error oocurs in getAttributeStatus:", error);
                BusyIndicator.hide();
            }
        });
    }

    private bindUserCourses2(): void {
        const view = this.getCurrentView();
        const model = view.getModel() as ODataModel;
        const table = view.byId("idUserCoursesTable") as Table;
        BusyIndicator.show();
    
        const path = "/UserCourses";
        const filterString = `user_ID eq guid'${this.userId}'`;
    
        model.read(path, {
            urlParameters: {
                "$filter": filterString
            },
            success: (data: any) => {
                const results = data?.results ?? [];
    
                const jsonModel = new JSONModel({ courses: results });
                view.setModel(jsonModel, "userCourses");
    
                table.unbindAggregation("items", true);
                table.bindAggregation("items", {
                    path: "userCourses>/courses",
                    template: new ColumnListItem({
                        cells: [
                            new Input({ value: "{userCourses>letterGrade}" }),
                            new Input({ value: "{userCourses>absenceCount}" })
                        ]
                    })
                });
    
                BusyIndicator.hide();
            },
            error: (error: any) => {
                console.error("Error while reading UserCourses:", error);
                BusyIndicator.hide();
            }
        });
    }
    


}