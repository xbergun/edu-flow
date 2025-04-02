import ManagedObject from "sap/ui/base/ManagedObject";
import Table from "sap/m/Table";
import Button, { Button$PressEvent } from "sap/m/Button";
import Column from "sap/ui/table/Column";
import ColumnListItem from "sap/m/ColumnListItem";
import Input from "sap/m/Input";
import View from "sap/ui/core/mvc/View";
import { Binding$DataReceivedEvent } from "sap/ui/model/Binding";
import VBox from "sap/m/VBox";
import MessageToast from "sap/m/MessageToast";
import OverflowToolbar from "sap/m/OverflowToolbar";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import TreeTable from "sap/ui/table/TreeTable";
import Text from "sap/m/Text";
import JSONModel from "sap/ui/model/json/JSONModel";
import ToolbarSpacer from "sap/m/ToolbarSpacer";
import Interactive from "sap/ui/table/rowmodes/Interactive";
import { InputBase$ChangeEvent } from "sap/m/InputBase";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";

/**
 * @namespace eduflowui.utils.generic_builders
 */
export default class TableBuilder extends ManagedObject {
    private view: View;
    private model: ODataModel;

    constructor(view: View, model: ODataModel) {
        super();
        this.view = view;
        this.model = model;
    }


    public async bindUserCourses(path: string, auth0Id: string): Promise<void> {
        return new Promise((resolve) => {
            const table = this.view.byId("idUserCoursesTable") as Table;

            const filter = new Filter("user_auth0_ID", FilterOperator.EQ, auth0Id);
            table.unbindAggregation("items", true);
            table.bindAggregation("items", {
                path: "/UserCourses",
                filters: [filter],
                parameters: {
                    expand: "user,course,course/to_Teacher"
                },
                template: new ColumnListItem({
                    cells: [
                        new Text({ text: "{course/name}" }),
                        new Text({ text: "{course/credits}" }),
                        new Text({ text: "{absenceCount}" }),
                        new Text({ text: "{course/absenceLimit}" }),
                        new Text({ text: "{course/to_Teacher/name}" }),
                        new Text({ text: "{letterGrade}" })
                    ]
                })
            });
            resolve();
        }
        );
    }


}