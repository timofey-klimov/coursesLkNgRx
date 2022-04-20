import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetManagedStudentsResponse } from "../../types/getManagedStudents.response";
import { IGetTeacherTestsResponse } from "../../types/getTests.response";
import { ICreateTestState } from "./createTest.state";
import { IGroupInfoState } from "./groupInfo.state";
import { IManagedStudentsState } from "./managedStudents.state";

export interface ITeacherPageState {
    isLoading: boolean,
    createdTests: IGetTeacherTestsResponse,
    groups: IGetGroupsResponse,
    groupInfo: IGroupInfoState,
    createTest: ICreateTestState,
    managedStudents: IManagedStudentsState
}