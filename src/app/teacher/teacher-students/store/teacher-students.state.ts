import { IGetManagedStudentsResponse } from "../types/getManagedStudents.response";
import { IGetStudentInfoResponse } from "../types/getStudentInfo.response";

export interface IStudentInfoState {
    student: IGetStudentInfoResponse,
    wasError: boolean,
    isLoading: boolean
}

export const initialStudentInfoState: IStudentInfoState = {
    student: null,
    wasError: false,
    isLoading: false
}

export interface ITeacherStudentsState {
    isLoading: boolean,
    students: IGetManagedStudentsResponse,
    studentInfo: IStudentInfoState
}

export const initialTeacherStudentsState: ITeacherStudentsState = {
    isLoading: false,
    students: null,
    studentInfo: initialStudentInfoState
}