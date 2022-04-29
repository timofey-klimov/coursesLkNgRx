import { ITeacherTestsState } from "../../teacher-tests/store/teacher-tests.state";
import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetTeacherTestsResponse } from "../../teacher-tests/types/getTests.response";
import { ICreateTestState } from "./createTest.state";
import { IGetStudentInfoState } from "./getStudentInfo.state";
import { IGroupInfoState } from "./groupInfo.state";
import { IManagedStudentsState } from "./managedStudents.state";

export interface ITeacherPageState {
    isLoading: boolean,
    createdTests: IGetTeacherTestsResponse,
    groups: IGetGroupsResponse,
    groupInfo: IGroupInfoState,
    createTest: ICreateTestState,
    managedStudents: IManagedStudentsState,
    studentInfo: IGetStudentInfoState,
}