import { createAction, props } from "@ngrx/store";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";
import { ILoginRequest } from "../../types/loginRequest.interface";
import { ActionTypes } from "../actionTypes";

export const loginAction = createAction(
    ActionTypes.Login,
    props<{request: ILoginRequest}>()
)

export const loginSuccessAction = createAction(
    ActionTypes.Login_Success,
    props<{user: ICurrentUser}>()
)

export const loginFailAction = createAction(
    ActionTypes.Login_Fail,
    props<{error: string}>()
)