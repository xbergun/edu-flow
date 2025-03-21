import ManagedObject from "sap/ui/base/ManagedObject";
import Dialog from "sap/m/Dialog";
import Button from "sap/m/Button";
import Select from "sap/m/Select";
import TextArea from "sap/m/TextArea";
import Item from "sap/ui/core/Item";
import MessageBox from "sap/m/MessageBox";
import View from "sap/ui/core/mvc/View";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import HTML from "sap/ui/core/HTML";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import Label from "sap/m/Label";
import Group from "sap/ui/comp/smartform/Group";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import JSONModel from "sap/ui/model/json/JSONModel";



/**
 * @namespace eduflowui.utils.generic_builders
 */

export default class DialogBuilder extends ManagedObject {
    private static locationTypeDialog: Dialog | null = null;
    private static mapDialog: Dialog | null = null;
    private view: View;

    constructor(view: View) {
        super();
        this.view = view;
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

    public addNewCourseDialog(): Promise<{ CourseName: string; Description: string } | null> {
        return new Promise((resolve) => {
            const smartForm = new SmartForm({
                editable: true,
                groups: [
                    new Group({
                        groupElements: [
                            new GroupElement({
                                elements: [
                                    new SmartField({ value: "{Name}", editable: true })
                                ]
                            }),
                            new GroupElement({
                                elements: [
                                    new SmartField({ value: "{Credits}", editable: true })
                                ]
                            }),
                            new GroupElement({
                                elements: [
                                    new SmartField({ value: "{Capacity}", editable: true })
                                ]
                            }),
                        ]
                    })
                ]

            });

            const dialog = new Dialog({
                title: "Add New Course",
                contentWidth: "400px",
                content: [smartForm],
                beginButton: new Button({
                    text: "Add",
                    press: () => {
                        const model = smartForm.getModel() as JSONModel;
                        const formData = model.getData();

                        if (!formData?.CourseName || !formData?.Description) {
                            MessageBox.error("All fields are required.");
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
