import { OnEventHandler, Request } from "@sap/cds";
import { ICAPRequest } from "../types/common.types";
import { IUsers } from "../types/data-operation.types";

export const getUsers: OnEventHandler = async function (req: Request): Promise<IUsers[]> {
    const query = (req as ICAPRequest)._.req.query;
    const users: IUsers[] = [];
    console.log("getUsers");
    return users;
};