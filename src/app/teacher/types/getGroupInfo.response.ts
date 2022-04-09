import { IAssignTest } from "src/app/shared/types/assignTest.interface";
import { IGroup } from "src/app/shared/types/group.interface";
import { ISimpleStudyGroup } from "src/app/shared/types/simpleStudyGroup.interface";
import { IStudent } from "src/app/shared/types/student.interface";

export interface GetGroupInfoResponse {
    students: Array<IStudent>,
    assignTests: Array<IAssignTest>,
    studyGroup: ISimpleStudyGroup
}