import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Core from "sap/ui/core/Core";
import { Routes, IAuth0User } from "eduflowui/types/global.types";

/**
 * @namespace eduflowui.controller
 */
export default class Callback extends BaseController {

    public onInit(): void {
        const hash = sessionStorage.getItem("auth0_redirect_hash");
        if (!hash) {
            this.getRouter().navTo(Routes.LOGIN);
            return;
        }
    
        const params = new URLSearchParams(hash.substring(1));
        const idToken  = params.get("id_token");
    
        if (idToken) {
            const user = this.decodeJwt(idToken);

            const accessToken = params.get("access_token");
            if (accessToken) {
                sessionStorage.setItem("access_token", accessToken);
            }

            const userData: IAuth0User= {
                Auth0Id: user.sub,
                Name: user.name,
                Nickname: user.nickname,
                Email: user.email,
                Picture: user.picture,
                StudentNumber: user.studentNumber,
                ProgramName : user.programName,
                DepartmentName: user.departmentName
            };

            sessionStorage.setItem("user", JSON.stringify(userData));
            this.getRouter().navTo(Routes.USERS);
        }
    }

  public  decodeJwt(token: string): any {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
      
        try {
          const payload = parts[1];
          const decoded = atob(payload);
          return JSON.parse(decoded);
        } catch (e) {
          console.error("JWT çözümleme hatası:", e);
          return null;
        }
      }
      
    
}
