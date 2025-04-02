import cds, { OnEventHandler, Request } from "@sap/cds";
import { ICAPRequest } from "../types/common.types";
import { ICredits, IUsers } from "../types/data-operation.types";

export const getUsers: OnEventHandler = async function (req: Request): Promise<IUsers[]> {
    const query = (req as ICAPRequest)._.req.query;
    const users: IUsers[] = [];
    console.log("getUsers");
    return users;
};

export const getCurrentCreditsByStudent: OnEventHandler = async function (req: Request): Promise<ICredits[]> {
    const db = await cds.connect.to("db");
    const tx = cds.transaction(req);
    const { UserCourses, ApplicationUsers } = db.entities;

    const { auth0_ID } = req.data;

    if (!auth0_ID) {
        throw new Error("Auth0 ID not found");
    }

    const user = await tx.run(
        SELECT.from(ApplicationUsers)
            .columns(
                "to_Program.to_Department.maxCredits",
            )
            .where({ auth0_ID: auth0_ID })
    );

    if (!user || user.length === 0) {
        throw new Error("User not found");
    }

    const maxCredits = user[0].to_Program_to_Department_maxCredits ?? 0;

    const userCourses = await tx.run(
        SELECT.from(UserCourses)
            .columns("course.credits")
            .where({ user_auth0_ID: auth0_ID })
    );

    if (!userCourses || userCourses.length === 0) {
        return [{ currentCredits: 0, maxCredits }];
    }

    const currentCredits = userCourses.reduce((acc: any, course: any) => {
        return acc + (course.course_credits ?? 0);
    }, 0);

    const credits: ICredits[] = [
        {
            currentCredits,
            maxCredits

        }
    ];

    return credits;
};