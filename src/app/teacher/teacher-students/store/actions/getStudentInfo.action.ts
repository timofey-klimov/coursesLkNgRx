import { createAction, props } from "@ngrx/store"
import { IGetStudentInfoRequest } from "src/app/teacher/teacher-students/types/getStudentInfo.request"
import { IGetStudentInfoResponse } from "src/app/teacher/teacher-students/types/getStudentInfo.response"
import { ActionTypes } from "../actionTypes"

export const getStudentInfoAction = createAction(
    ActionTypes.GetStudentInfo,
    props<{request: IGetStudentInfoRequest}>()
)

export const getStudentInfoSuccessAction = createAction(
    ActionTypes.GetStudentInfoSuccess,
    props<{response: IGetStudentInfoResponse}>()
)

export const getStudentInfoFailedAction = createAction(
    ActionTypes.GetStudentInfoFailed,
    props<{message: string}>()
)