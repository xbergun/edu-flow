import ManagedObject from "sap/ui/base/ManagedObject";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @namespace eduflowui.utils.odata_helpers
 */
export default class ReadHelper extends ManagedObject {
    private model: ODataModel;

    constructor(model: ODataModel) {
        super();
        this.model = model;
    }

    public readAsync(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.model.read(path, {
                success: (data:any) => resolve(data),
                error: (error:any) => reject(error)
            });
        });
    }

}