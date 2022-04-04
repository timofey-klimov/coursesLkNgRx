import { IStudent } from "src/app/shared/types/student.interface";
import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetTeachersResponse } from "../../types/getTeachers.response";

export interface IManageGroupState {
    manageGroups: IGetGroupsResponse
    availabledTeachers: IGetTeachersResponse,
    allStudents: IStudent[],
}