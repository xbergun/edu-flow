import ManagedObject from "sap/ui/base/ManagedObject";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import MessageToast from "sap/m/MessageToast";
import MessageBox from "sap/m/MessageBox";
import Table from "sap/m/Table";
import ColumnListItem from "sap/m/ColumnListItem";
import SmartForm from "sap/ui/comp/smartform/SmartForm";

/**
 * @namespace eduflowui.utils.odata_helpers
 */
export default class DeleteHelper extends ManagedObject {
    private model: ODataModel;

    constructor(model: ODataModel) {
        super();
        this.model = model;
    }

    private deleteEntity(path: string, successMessage: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.model.remove(path, {
                success: () => {
                    this.model.refresh(true);
                    MessageToast.show(successMessage);
                    resolve();
                },
                error: (error: { message: string }) => {                
                    MessageToast.show("Error deleting entity: " + error.message);
                    reject(error);
                }
            });
        });
    }

    private confirmAndDeleteEntity(path: string, message: string, successMessage: string): Promise<void> {
        return new Promise((resolve, reject) => {
            MessageBox.confirm(message, {
                title: "Confirmation",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: (action: typeof MessageBox.Action[keyof typeof MessageBox.Action]) => {
                    if (action === MessageBox.Action.OK) {
                        this.deleteEntity(path, successMessage)
                            .then(resolve)
                            .catch(reject);
                    } else {
                        resolve(); 
                    }
                }
            });
        });
    }

    public async deleteCourses(table: Table): Promise<void[]> {
        const selectedItems = table.getSelectedItems() as ColumnListItem[];

        if (selectedItems.length === 0) {
            MessageToast.show("Please select at least one row to delete.");
            return Promise.resolve([]);
        }

        const deletePromises = selectedItems.map((item) => {
            const data = item.getBindingContext()?.getObject() as { ID: string};
            if (data) {
                const deletePath = `/Courses(ID=guid'${data.ID}')`;
                return this.deleteEntity(deletePath, "Selected courses deleted.");
            }
            return Promise.resolve();
        });

        return Promise.all(deletePromises);
    }

    public async deleteUserCourses(table: Table): Promise<void[]> {
        const selectedItems = table.getSelectedItems() as ColumnListItem[];

        if (selectedItems.length === 0) {
            MessageToast.show("Please select at least one row to delete.");
            return Promise.resolve([]);
        }

        const deletePromises = selectedItems.map((item) => {
            const data = item.getBindingContext()?.getObject() as { ID: string, user_auth0_ID: string, course_ID: string };
            if (data) {
                const deletePath = `/UserCourses(ID=guid'${data.ID}',user_auth0_ID='${data.user_auth0_ID}',course_ID=guid'${data.course_ID}')`;
                return this.deleteEntity(deletePath, "Selected courses deleted.");
            }
            return Promise.resolve();
        });

        return Promise.all(deletePromises);
    }
}