import { OnEventHandler, Request } from "@sap/cds";
import { ICAPRequest } from "../types/common.types";
import { ICourses } from "../types/data-operation.types";

export const getCourses: OnEventHandler = async function (req: Request): Promise<ICourses[]> {
    const query = (req as ICAPRequest)._.req.query;
    const courses: ICourses[] = [];
    return courses;
};