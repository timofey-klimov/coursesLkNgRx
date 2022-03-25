import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const activateAction = createAction(
    ActionTypes.Activate,
    props<{password: string}>()
)

export const activateSuccessAction = createAction(
    ActionTypes.Activate_Success
)

export const activateFailAction = createAction(
    ActionTypes.Activate_Fail,
    props<{error: string}>()
)