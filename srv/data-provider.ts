import { ApplicationService } from "@sap/cds";
import { getCourses, createBeforeCourse} from "./lib/handlers/courses.handler";
import { getCurrentCreditsByStudent, getUsers } from "./lib/handlers/users.handler";
import { getUserCourses } from "./lib/handlers/userCourses.handler";
import { getAuth0Keys} from "./lib/handlers/auth.handler";

export default class EduFlowService extends ApplicationService {
    async init(): Promise<void> {
        /* ======================================================================================================================= */
        /* Before Handling                                                                                                         */
        /* ======================================================================================================================= */

        /* ======================================================================================================================= */
        /* On Handling                                                                                                             */
        /* ======================================================================================================================= */

        this.on("READ", "Courses", getCourses);
        //this.on("READ", "UserCourses", getUserCourses);
       // this.on("CREATE", "Courses", createCourse);
      //  this.on("READ", "Users", getUsers);

        /* ======================================================================================================================= */
        /* After Handling                                                                                                          */
        /* ======================================================================================================================= */
        
        /* ======================================================================================================================= */
        /*  Function Handling                                                                                                      */
        /* ======================================================================================================================= */
        this.on("getAuth0Keys", getAuth0Keys);
        this.on("getCurrentCreditsByStudent", getCurrentCreditsByStudent);

        return super.init();
    }
}