import { createAction, props } from "@ngrx/store";
import { IRemoveStudentsRequest } from "../../types/removeStudents.request";
import { IRemoveStudentsResponse } from "../../types/removeStudents.response";
import { ActionTypes } from "../actionTypes";

export const removeStudentsAction = createAction(
    ActionTypes.RemoveStudents,
    props<{request: IRemoveStudentsRequest}>()
)

export const removeStudentsAction_Success = createAction(
    ActionTypes.RemoveStudents_Success,
    props<{response: IRemoveStudentsResponse}>()
)

export const removeStudentsAction_Failed = createAction(
    ActionTypes.RemoveStudents_Failed,
    props<{error: string}>()
)