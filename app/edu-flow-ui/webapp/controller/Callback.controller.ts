import BaseController from "./BaseController";
import JSONModel from "sap/ui/model/json/JSONModel";
import Core from "sap/ui/core/Core";
/**
 * @namespace eduflowui.controller
 */
export default class Callback extends BaseController {

    public onInit(): void {
        const view = this.getCurrentView();

        const hash = sessionStorage.getItem("auth0_redirect_hash");
        if (!hash) {
            this.getRouter().navTo("RouteLogin");
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
            sessionStorage.setItem("user", JSON.stringify(user));

            const userModel = new JSONModel(user);
            Core.setModel(userModel, "user");

            this.getRouter().navTo("RouteUsers");
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
