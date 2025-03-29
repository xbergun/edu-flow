import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Core from "sap/ui/core/Core";
import { Routes, IAuth0User } from "eduflowui/types/global.types";
import ODataCreateHelper from "../utils/odata_helpers/CreateHelper";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import View from "sap/ui/core/mvc/View";
import MessageToast from "sap/m/MessageToast";
import CreateHelper from "../utils/odata_helpers/CreateHelper";
import Component from "eduflowui/Component";
/**
 * @namespace eduflowui.controller
 */
export default class Callback extends BaseController {
  private model: ODataModel;
  private view: View;
  private oDataCreateHelper!: CreateHelper;

  public onInit(): void {

    const model = (this.getOwnerComponent() as Component).getModel() as ODataModel;
    const view = this.getCurrentView();

    this.oDataCreateHelper = new CreateHelper(model);

    this.model = model;
    this.view = view;

    this.prepareLogin();
  }

  private async prepareLogin(): Promise<void> {
    const hash = sessionStorage.getItem("auth0_redirect_hash");
    if (!hash) {
      this.getRouter().navTo(Routes.LOGIN);
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    const idToken = params.get("id_token");

    if (idToken) {
      const user = await this.decodeJwt(idToken);

      const userData: IAuth0User = {
        Auth0Id: user.sub,
        Name: user.name,
        Nickname: user.nickname,
        Email: user.email,
        Picture: user.picture,
        StudentNumber: user.studentNumber,
        ProgramName: user.programName,
        DepartmentName: user.departmentName,
        IsTeacher: user.isTeacher
      };

      this.oDataCreateHelper.createUser(userData).then(() => {
        const loggedInUser = this.getOwnerComponent()?.getModel("loggedInUser") as JSONModel;
        loggedInUser.setData(userData);

        userData.IsTeacher ? this.getRouter().navTo(Routes.COURSES) : this.getRouter().navTo(Routes.DASHBOARD);
      
      }).catch((error) => {
        MessageToast.show("Error creating user.");
        console.log("Error creating user:", error);
        this.getRouter().navTo(Routes.LOGIN);
      });
    }
  }

  private async decodeJwt(token: string): Promise<any> {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    try {
      const payload = parts[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error("JWT Error:", e);
      return null;
    }
  }


}
