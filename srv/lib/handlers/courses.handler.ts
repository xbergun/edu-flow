import cds, { OnEventHandler, Request } from "@sap/cds";
import { ICAPRequest } from "../types/common.types";
import { ICourses } from "../types/data-operation.types";

export const getCourses: OnEventHandler = async function (req: Request): Promise<ICourses[]> {
    const db = await cds.connect.to("db");
    const { Courses } = db.entities;

    const tx = cds.transaction(req);

    const auth0Id = req.headers["x-auth0-id"];

    if (!auth0Id || typeof auth0Id !== "string") {
        req.error(400, "Missing or invalid 'x-auth0-id' header");
        return [];
    }

    const courses = await tx.run(
        SELECT.from(Courses)
            .columns(
                "ID",
                "name",
                "credits",
                "capacity",
                "absenceLimit",
                "to_Teacher.auth0_ID"
            )
            .where({ "to_Teacher_auth0_ID": auth0Id })
    );
    
    return courses;
};


export const createBeforeCourse: OnEventHandler = async function (req: Request): Promise<void> {
    next();
};
function next() {
    throw new Error("Function not implemented.");
}

