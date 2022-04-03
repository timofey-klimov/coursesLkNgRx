import { ITeacher } from "src/app/shared/types/teacher.interface";
import { IGetGroupsResponse } from "../../types/getGroups.response";

export interface IManageGroupState {
    manageGroups: IGetGroupsResponse
    availabledTeachers: ITeacher[],
}