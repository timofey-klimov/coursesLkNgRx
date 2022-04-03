import { IGetGroupsResponse } from "../types/getGroups.response";
import { IGetUsersResponse } from "../types/getUsers.response";

export interface IAdminPageState {
    isLoading: boolean;
    error: string;
    manageUsers: IGetUsersResponse,
    manageGroups: IGetGroupsResponse
}