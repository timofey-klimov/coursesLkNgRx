import { createAction, props } from "@ngrx/store";
import { IGetStudentsRequest } from "../../types/getStudents.request";
import { IGetStudentsResponse } from "../../types/getStudents.response";
import { ActionTypes } from "../actionTypes";

export const getAllStudentsAction = createAction(
    ActionTypes.GetAllStudents,
    props<{request: IGetStudentsRequest}>()
)
export const getAllStudentsAction_Success = createAction(
    ActionTypes.GetAllStudents_Success,
    props<{response: IGetStudentsResponse}>()
)
export const getAllStudentsAction_Failed = createAction(
    ActionTypes.GetAllStudents_Failed,
    props<{message: string}>()
)