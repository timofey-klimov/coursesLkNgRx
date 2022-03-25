import { createAction, props } from "@ngrx/store";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";
import { ActionTypes } from "../actionTypes";

export const getUserAction = createAction(
    ActionTypes.GetUser,
)

export const getUserSuccessAction = createAction(
    ActionTypes.GetUser_Success,
    props<{user: ICurrentUser}>()
)

export const getUserFailedAction = createAction(
    ActionTypes.GetUser_Failed
)