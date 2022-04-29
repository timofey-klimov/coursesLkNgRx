import { IGetTeacherTestsResponse } from "../types/getTests.response";

export interface ICreateTestState {
    successCreated: boolean;
}

export interface ITeacherTestsState {
    isLoading: boolean;
    createdTests: IGetTeacherTestsResponse,
    createTest: ICreateTestState
}

export const initialCreateTestState: ICreateTestState = {
    successCreated: false
}

export const initialTeacherTestsState: ITeacherTestsState = {
    isLoading: false,
    createdTests: null,
    createTest: initialCreateTestState
}