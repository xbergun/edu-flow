import { OnEventHandler, Request } from "@sap/cds";
import { IAuth0Config } from "../types/common.types";
import { getDestination } from "@sap-cloud-sdk/connectivity";

export const getAuth0Keys: OnEventHandler = async function (req: Request): Promise<IAuth0Config | undefined> {
    try {
        const destination = await getDestination({ destinationName: "auth0-keys" }) ;
        const props = destination?.originalProperties;
        if (!props) {
            req.error(500, "Destination properties not found.");
            return;
        }
        return {
            Url: props.URL,
            Domain: props.Domain,
            ClientId: props.ClientId
        };
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        req.error(500, "Destination retrieval error: " + errorMessage);
        return undefined;
    }
}