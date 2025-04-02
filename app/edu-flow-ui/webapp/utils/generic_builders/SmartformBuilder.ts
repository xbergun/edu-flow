import ManagedObject from "sap/ui/base/ManagedObject";
import SmartForm from "sap/ui/comp/smartform/SmartForm";
import ColumnLayout from "sap/ui/comp/smartform/ColumnLayout";
import OverflowToolbar from "sap/m/OverflowToolbar";
import Title from "sap/m/Title";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Button, { Button$PressEvent } from "sap/m/Button";
import Group from "sap/ui/comp/smartform/Group";
import GroupElement from "sap/ui/comp/smartform/GroupElement";
import SmartField from "sap/ui/comp/smartfield/SmartField";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import { Binding$DataReceivedEvent } from "sap/ui/model/Binding";
import View from "sap/ui/core/mvc/View";
import VBox from "sap/m/VBox";
import MessageToast from "sap/m/MessageToast";
import { InputBase$ChangeEvent } from "sap/m/InputBase";
import JSONModel from "sap/ui/model/json/JSONModel";
import Context from "sap/ui/model/odata/v2/Context";

/**
 * @namespace eduflowui.utils.generic_builders
 */
export default class SmartformBuilder extends ManagedObject {
    private model: ODataModel;
    private view: View;

    constructor(view: View, model: ODataModel) {
        super();
        this.view = view;
        this.model = model;
    }
    
    public buildNewCourseForm(model: JSONModel): SmartForm {
        const smartForm = new SmartForm({
            editable: true,
            layout: new ColumnLayout(),
            groups: [
                new Group({
                    groupElements: [
                        new GroupElement({
                            elements: [
                                new SmartField({ value: "{/name}", editable: true, placeholder: "Enter Course Name" })
                            ]
                        }),
                        new GroupElement({
                            elements: [
                                new SmartField({ value: "{/credits}", editable: true })
                            ]
                        }),
                        new GroupElement({
                            elements: [
                                new SmartField({ value: "{/capacity}", editable: true })
                            ]
                        }),
                        new GroupElement({
                            elements: [
                                new SmartField({ value: "{/absenceLimit}", editable: true })
                            ]
                        }),
                    ]
                })
            ]
        });
    
        smartForm.setModel(model);
        smartForm.bindElement("/");
        return smartForm;
    }

    public registerNewCourseForm(model: ODataModel, context: Context): SmartForm {
        const smartForm = new SmartForm({
            editable: true,
            layout: new ColumnLayout(),
            groups: [
                new Group({
                    groupElements: [
                        new GroupElement({
                            elements: [
                                new SmartField({
                                    value: "{course_ID}",
                                    editable: true,
                                    textLabel: "Select Course"
                                })
                            ]
                        })
                    ]
                })
            ]
        });
    
        smartForm.setModel(model);
        smartForm.setBindingContext(context);
        return smartForm;
    }


}
