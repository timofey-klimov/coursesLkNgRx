import { IAssignTest } from "src/app/shared/types/assignTest.interface";
import { ISimpleStudyGroup } from "src/app/shared/types/simpleStudyGroup.interface";
import { IStudent } from "src/app/shared/types/student.interface";

export interface IGetStudentInfoResponse {
    studentDto: IStudent,
    assignTests: Array<IAssignTest>,
    studyGroups: Array<ISimpleStudyGroup>
}