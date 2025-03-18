import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { Routes } from "eduflowui/types/global.types";

/**
 * @namespace eduflowui.controller
 */
export default class Login extends BaseController {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }
    public onLoginPress(): void {
        const oRouter = this.getRouter();
        oRouter.navTo(Routes.COURSES);
    }
}