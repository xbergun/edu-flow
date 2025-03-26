import { Request } from "@sap/cds";
import { Request as ExpressRequest } from "express";


export interface ICAPRequest extends Request {
    _: {
        req: ExpressRequest;
    };
}

export interface IAuth0Config {
    Url: string;
    Domain: string;
    ClientId: string;
  }