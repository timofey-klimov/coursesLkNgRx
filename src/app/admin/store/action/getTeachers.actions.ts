import { createAction, props } from "@ngrx/store";
import { IGetTeachersRequest } from "../../types/getTeachers.request";
import { IGetTeachersResponse } from "../../types/getTeachers.response";
import { ActionTypes } from "../actionTypes";

export const getTeachersAction = createAction(
    ActionTypes.GetTeachers,
    props<{request: IGetTeachersRequest}>()
)
export const getTeachersAction_Success = createAction(
    ActionTypes.GetTeachers_Success,
    props<{response: IGetTeachersResponse}>()
)
export const getTeachersAction_Failed = createAction(
    ActionTypes.GetTeachers_Failed,
    props<{message: string}>()
)