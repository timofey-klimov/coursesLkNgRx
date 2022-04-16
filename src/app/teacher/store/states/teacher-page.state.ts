import { IGetGroupsResponse } from "../../types/getGroups.response";
import { IGetTeacherTestsResponse } from "../../types/getTests.response";
import { ICreateTestState } from "./createTest.state";
import { IGroupInfoState } from "./groupInfo.state";

export interface ITeacherPageState {
    isLoading: boolean,
    createdTests: IGetTeacherTestsResponse,
    groups: IGetGroupsResponse,
    groupInfo: IGroupInfoState,
    createTest: ICreateTestState
}