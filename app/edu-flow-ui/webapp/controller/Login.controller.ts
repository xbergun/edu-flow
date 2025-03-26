import Controller from "sap/ui/core/mvc/Controller";
import BaseController from "./BaseController";
import { ApplicationModels, IAuth0, Routes } from "eduflowui/types/global.types";
import JSONModel from "sap/ui/model/json/JSONModel";
/**
 * @namespace eduflowui.controller
 */
export default class Login extends BaseController {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        
    }
    public onLoginPress(): void {
        const auth0Model = this.getModel(ApplicationModels.AUTH0) as JSONModel;
        const auth0Config: IAuth0 = auth0Model.getData();

        const authUrl = `https://${auth0Config.Domain}/authorize?` +
            `response_type=token id_token&` +
            `client_id=${auth0Config.ClientId}&` +
            `redirect_uri=${encodeURIComponent(auth0Config.Url)}&` +
            `scope=openid profile email&` +
            `nonce=random123`;


        window.location.href = authUrl;

    }

}