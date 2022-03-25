import { IUserFilter } from "../../shared/types/userFilter.interface";

export interface IGetUsersRequest {
    limit: number;
    offset: number;
    filter: IUserFilter
}