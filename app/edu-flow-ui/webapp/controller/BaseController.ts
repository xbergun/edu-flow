import ResourceBundle from "sap/base/i18n/ResourceBundle";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import Router from "sap/ui/core/routing/Router";
import Model from "sap/ui/model/Model";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import { ApplicationModels, DefaultMessages, IAuth0User } from "../types/global.types";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import View from "sap/ui/core/mvc/View";
import Component from "../Component";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace eduflowui.controller
 */export default class BaseController extends Controller {


    public getODataModel(modelName?: ApplicationModels): ODataModel {
        return (this.getView() as View).getModel(modelName) as ODataModel;
    }

    public getComponentModel(modelName?: ApplicationModels): ODataModel {
        return (this.getOwnerComponent() as UIComponent).getModel(modelName) as ODataModel;
    }

    public getRootControl(): View {
        return (this.getOwnerComponent() as UIComponent).getRootControl() as View;
    }


    public getCurrentView(): View {
        return this.getView() as View;

    }

    public getRouter(): Router {
        return (this.getOwnerComponent() as UIComponent).getRouter();
    }

    public getModel(modelName?: ApplicationModels): Model {
        return this.getView()?.getModel(modelName)!;
    }

    public setModel(oModel: Model, modelName?: string): void {
        this.getView()?.setModel(oModel, modelName);
    }

    public getResourceBundle(): ResourceBundle {
        return (((this.getOwnerComponent() as UIComponent).getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle);
    }

    public getResourceBundleText(key: string, parameters?: any[]): string {
        const resourceBundle = this.getResourceBundle();
        return resourceBundle.getText(key, parameters, true) || DefaultMessages.NO_I18N_TEXT;
    }

    public getUIComponent(): Component {
        return this.getOwnerComponent() as Component;
    }

    public getLoggedInUserModel(): JSONModel {
        return this.getUIComponent().getModel("loggedInUser") as JSONModel;
    }
    
    public getLoggedInUserData(): IAuth0User {
        return this.getLoggedInUserModel().getData() as IAuth0User;
    }

    public onLogOutButtonPress(): void {
        this.getRouter().navTo("RouteLogin", {}, true);
        this.getLoggedInUserModel().setData({} as IAuth0User);
        this.getLoggedInUserModel().refresh(true);
        this.getODataModel().refresh(true);
        this.getComponentModel().refresh(true);
    }
    

} 