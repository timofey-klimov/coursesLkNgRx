import { IGetStudentInfoResponse } from "../../types/getStudentInfo.response";

export interface IGetStudentInfoState {
    student: IGetStudentInfoResponse,
    wasError: boolean,
    isLoading: boolean
}

export const initialGetStudentInfoState: IGetStudentInfoState = {
    student: null,
    wasError: false,
    isLoading: false
}