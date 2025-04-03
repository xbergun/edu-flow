import ManagedObject from "sap/ui/base/ManagedObject";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import MessageBox from "sap/m/MessageBox";
import View from "sap/ui/core/mvc/View";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import { ICourses } from './../../types/courses.types';
import SmartformBuilder from "./SmartformBuilder";
import { IUserCoursesForm } from "eduflowui/types/global.types";


/**
 * @namespace eduflowui.utils.generic_builders
 */

export default class DialogBuilder extends ManagedObject {
    private view: View;
    private model: ODataModel;
    private smartFormBuilder: SmartformBuilder;

    constructor(view: View) {
        super();
        this.view = view;
        this.smartFormBuilder = new SmartformBuilder(view,this.model);
    }


    public confirmDeletion(message: string): Promise<boolean> {
        return new Promise((resolve) => {
            MessageBox.confirm(message, {
                title: "Confirmation",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: (action: typeof MessageBox.Action[keyof typeof MessageBox.Action]) => {
                    resolve(action === MessageBox.Action.OK);
                }
            });
        });
    }

    public addNewCourseByUserDialog(): Promise<IUserCoursesForm | null> {
        return new Promise((resolve) => {
    
            const oDataModel = this.view.getModel() as ODataModel;
    
            const bindingContext = oDataModel.createEntry("/UserCourses", {
                properties: {
                    course_ID: ""
                }
            });
    
            if (!bindingContext) {
                throw new Error("Binding context is undefined.");
            }
            const smartForm = this.smartFormBuilder.registerNewCourseForm(oDataModel, bindingContext);
    
            const dialog = new Dialog({
                title: "Register New Course",
                contentWidth: "400px",
                content: [smartForm],
                beginButton: new Button({
                    text: "Add",
                    press: () => {
                        const data = bindingContext.getObject() as IUserCoursesForm;
    
                        if (!data.course_ID) {
                            MessageToast.show("Please select a course.");
                            return;
                        }
                        dialog.close();
                        resolve(data);
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: () => {
                        oDataModel.resetChanges();
                        dialog.close();
                        resolve(null);
                    }
                })
            });
    
            this.view.addDependent(dialog);
            dialog.open();
        });
    }
    
    public addNewCourseDialog(): Promise<ICourses | null> {
        return new Promise((resolve) => {
    
            const tempModel = new JSONModel({
                name: "",
                credits: 0,
                capacity: 0,
                absenceLimit: 0
            });    
            
            const smartForm = this.smartFormBuilder.buildNewCourseForm(tempModel);

            const dialog = new Dialog({
                title: "Add New Course",
                contentWidth: "400px",
                content: [smartForm],
                beginButton: new Button({
                    text: "Add",
                    press: () => {
                        const formData = tempModel.getData();
    
                        if (!formData?.name) {
                            MessageToast.show("All fields are required.");
                            return;
                        }
                        dialog.close();
                        resolve(formData);
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: () => {
                        dialog.close();
                        resolve(null);
                    }
                })
            });
    
            this.view.addDependent(dialog);
            dialog.open();
        });
    }
    



}
