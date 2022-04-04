import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetStudentsResponse } from "../../types/getStudents.response";
import { IGetTeachersResponse } from "../../types/getTeachers.response";

export interface IManageGroupState {
    manageGroups: IGetGroupsResponse
    availabledTeachers: IGetTeachersResponse,
    allStudents: IGetStudentsResponse,
}