import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetStudentsResponse } from "../../types/getStudents.response";
import { IGetStudyGroupInfoResponse } from "../../types/getStudyGroupInfo.response";
import { IGetTeachersResponse } from "../../types/getTeachers.response";
import { IGetGroupInfoState } from "./getGroupInfo.state";

export interface IManageGroupState {
    manageGroups: IGetGroupsResponse
    availabledTeachers: IGetTeachersResponse,
    allStudents: IGetStudentsResponse,
    groupInfoState: IGetGroupInfoState,
    currentPage: number,
    itemsPerPage: number
}