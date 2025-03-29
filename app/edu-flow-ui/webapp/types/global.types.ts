
import Filter from "sap/ui/model/Filter";
import { Model$RequestFailedEvent as RequestFailedEvent } from "sap/ui/model/Model";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import BaseController from "../controller/BaseController";

export enum ApplicationModels {
    DEFAULT_ODATA = "",
    I18N = "i18n",
    AUTH0 = "auth0",
    LOGGED_USER= "loggedInUser",
}

export enum DefaultMessages {
    NO_I18N_TEXT = "The message could not be displayed due to technical issues. Contact the administrator."
}
export interface IBindingParams {
    filters: Filter[]
}
export interface IPage {
    onODataRequestFail(event: RequestFailedEvent): void;
    onObjectMatched(event?: Route$PatternMatchedEvent): void;
}

export type PageController = IPage & BaseController;

export enum Routes {
    LOGIN = "RouteLogin",
    USERS = "RouteUsers",
    COURSES = "RouteCourses",
    NOT_FOUND = "RouteNotFound",
    ERROR = "RouteError",
    DASHBOARD = "RouteDashboard",
}

export enum ApplicationGroups {
    HOMEPAGE = "Homepage",
}

export interface IResponseV2<T> {
    d: T
}
export interface IAuth0Config{
    Domain: string;
    ClientId: string;
    Url: string;
}

export interface IAuth0User {
    Auth0Id: string;
    Name: string;
    Nickname: string;
    Email: string;
    Picture: string;
    StudentNumber: string;
    ProgramName: string;
    DepartmentName: string;
    IsTeacher: boolean;
}