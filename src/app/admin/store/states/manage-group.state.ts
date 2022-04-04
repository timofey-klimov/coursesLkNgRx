import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetStudentsResponse } from "../../types/getStudents.response";
import { IGetStudyGroupInfoResponse } from "../../types/getStudyGroupInfo.response";
import { IGetTeachersResponse } from "../../types/getTeachers.response";

export interface IManageGroupState {
    manageGroups: IGetGroupsResponse
    availabledTeachers: IGetTeachersResponse,
    allStudents: IGetStudentsResponse,
    groupInfo: IGetStudyGroupInfoResponse
}