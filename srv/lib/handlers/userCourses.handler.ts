import cds, { } from "@sap/cds";
import { OnEventHandler, Request } from "@sap/cds";
import { ICAPRequest } from "../types/common.types";
import { IUserCourses } from "../types/data-operation.types";

export const getUserCourses: OnEventHandler = async function (req: Request): Promise<IUserCourses[]> {
    try {
        const db = await cds.connect.to("db");
        const { UserCourses } = db.entities;
        const { user_ID } = req.data;
        let userCourses: IUserCourses[] = [];

        userCourses = await db.run(SELECT.from(UserCourses).where({ user_ID: user_ID }));

        return userCourses;
    } catch (error: any) {
        console.error('Error fetching PurchaseOrders from DB:', error.message);
        req.reply({ success: false, error: error.message });
        return [error.message];
    }
}
