import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetUsersResponse } from "../../types/getUsers.response";
import {  IManageGroupState } from "./manage-group.state";

export interface IAdminPageState {
    isLoading: boolean;
    error: string;
    manageUsers: IGetUsersResponse,
    manageGroupState: IManageGroupState
}