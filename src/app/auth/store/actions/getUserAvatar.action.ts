import { SafeUrl } from "@angular/platform-browser";
import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const getUserAvatarAction = createAction(
    ActionTypes.GetUserAvatar
)

export const getUserAvatarSuccess = createAction(
    ActionTypes.GetUserAvatarSuccess,
    props<{response: SafeUrl}>()
)

export const getUserAvatarFailed = createAction(
    ActionTypes.GetUserAvatarFailed
)