import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const getUserAvatarAction = createAction(
    ActionTypes.GetUserAvatar
)

export const getUserAvatarSuccess = createAction(
    ActionTypes.GetUserAvatarSuccess,
    props<{response: Blob}>()
)

export const getUserAvatarFailed = createAction(
    ActionTypes.GetUserAvatarFailed
)