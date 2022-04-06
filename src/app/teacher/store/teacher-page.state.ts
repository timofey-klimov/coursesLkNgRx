import { IGetTeacherTestsResponse } from "../types/getTests.response";

export interface ITeacherPageState {
    isLoading: boolean,
    createdTests: IGetTeacherTestsResponse
}