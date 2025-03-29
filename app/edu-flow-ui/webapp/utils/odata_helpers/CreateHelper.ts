import ManagedObject from "sap/ui/base/ManagedObject";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MessageToast from "sap/m/MessageToast";
import Table from "sap/m/Table";
import { IAuth0User, IResponseV2 } from "../../types/global.types";
import Filter from 'sap/ui/model/Filter';
import FilterOperator from 'sap/ui/model/FilterOperator';

/**
 * @namespace eduflowui.utils.odata_helpers
 */
export default class CreateHelper extends ManagedObject {
    private model: ODataModel;

    constructor(model: ODataModel) {
        super();
        this.model = model;
    }

    public createEntity<T>(entitySet: string, data: object, successMessage: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.model.create(entitySet, data, {
                success: (response: IResponseV2<T>) => {
                    MessageToast.show(successMessage);
                    resolve(response);
                },
                error: (error: { message: string }) => {
                    console.error("Error creating entity:", error.message);
                    MessageToast.show("Error creating entity.");
                    reject(error);
                }
            });
        });
    }

    public async createCourse(courseData: object, auth0_Id: string, programName: string): Promise<string | boolean> {

        const programId = await this.getProgramId(programName);

        const newData = {
            ...courseData,
            to_Teacher_auth0_ID: auth0_Id,
            to_Program_ID: programId
        }
        return this.createEntity("/Courses", newData, "New course created.")
    }


    public async createUser(userData: IAuth0User): Promise<string | boolean> {

        const isUserExits = await this.CheckIfUserExists(userData.Auth0Id);
        const isTeacher = userData.IsTeacher;

        if (isUserExits) return true;

        const programId = !isTeacher ? await this.getProgramId(userData.ProgramName) : null;

        const newUser = {
            auth0_ID: userData.Auth0Id,
            name: userData.Name,
            nickname: userData.Nickname,
            email: userData.Email,
            picture: userData.Picture,
            studentNumber: userData.StudentNumber,
            role: userData.IsTeacher ? "Teacher" : "Student",
            to_Program_ID: programId
        };

        return this.createEntity("/Users", newUser, "New user created.");
    }

    private CheckIfUserExists = (auth0Id: string): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            this.model.read("/Users", {
                filters: [new Filter("auth0_ID", FilterOperator.EQ, auth0Id)],
                success: (data: {
                    results: {
                        ID: string;
                    }[];
                }) => {
                    if (data.results.length > 0) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: (error: any) => {
                    console.error("Error getting user:", error);
                    reject(error);
                }
            });
        }
        );
    }

    private getProgramId = (programName: string) => {
        return new Promise((resolve, reject) => {
            this.model.read("/Programs", {
                filters: [new Filter("name", FilterOperator.EQ, programName)],
                success: (data: {
                    results: {
                        ID: string;
                    }[];
                }) => {
                    resolve(data.results[0].ID);
                },
                error: (error: any) => {
                    console.error("Error getting program ID:", error);
                    reject(error);
                }
            });
        }
        );
    }

}