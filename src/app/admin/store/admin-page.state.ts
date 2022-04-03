import { ITeacher } from "src/app/shared/types/teacher.interface";
import { IGetGroupsResponse } from "../types/getGroups.response";
import { IGetTeachersRequest } from "../types/getTeachers.request";
import { IGetUsersResponse } from "../types/getUsers.response";

export interface IAdminPageState {
    isLoading: boolean;
    error: string;
    manageUsers: IGetUsersResponse,
    manageGroups: IGetGroupsResponse,
    availabledTeachers: ITeacher[]
}