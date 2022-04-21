import { createAction, props } from "@ngrx/store";
import { IGetStudentInfoRequest } from "../../types/getStudentInfo.request";
import { IGetStudentInfoResponse } from "../../types/getStudentInfo.response";
import { ActionTypes } from "../actionsTypes";

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