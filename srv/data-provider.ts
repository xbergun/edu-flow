import { ApplicationService } from "@sap/cds";
import { getCourses } from "./lib/handlers/courses.handler";
import { getUsers } from "./lib/handlers/users.handler";
import { getUserCourses } from "./lib/handlers/userCourses.handler";
import { getAuth0Keys } from "./lib/handlers/auth.handler";

export default class GreenTokenPortalService extends ApplicationService {
    async init(): Promise<void> {

        /* ======================================================================================================================= */
        /* Before Handling                                                                                                         */
        /* ======================================================================================================================= */

        /* ======================================================================================================================= */
        /* On Handling                                                                                                             */
        /* ======================================================================================================================= */

        //this.on("READ", "Courses", getCourses);
        this.on("READ", "Users", getUsers);

        /* ======================================================================================================================= */
        /* After Handling                                                                                                          */
        /* ======================================================================================================================= */
        
        /* ======================================================================================================================= */
        /*  Function Handling                                                                                                      */
        /* ======================================================================================================================= */
        this.on("getUserCourses", getUserCourses);
        this.on("getAuth0Keys", getAuth0Keys);

        return super.init();
    }
}