import { IGetUsersResponse } from "../types/getUsers.response";
import { IUser } from "../../shared/types/user.interface";

export interface IAdminPageState {
    isLoading: boolean;
    error: string;
    manageUsers: IGetUsersResponse
}