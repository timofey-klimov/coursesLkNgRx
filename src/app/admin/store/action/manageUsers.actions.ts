import { createAction, props } from "@ngrx/store";
import { IGetUsersRequest } from "../../types/getUsers.request";
import { IGetUsersResponse } from "../../types/getUsers.response";
import { ActionTypes } from "../actionTypes";

export const getUsersAction = createAction(
    ActionTypes.GetManagedUsers,
    props<{request: IGetUsersRequest}>()
)

export const getUsersSuccessAction = createAction(
    ActionTypes.GetManagedUsers_Success,
    props<{users: IGetUsersResponse}>()
)

export const getUsersFailAction = createAction(
    ActionTypes.GetManagedUsers_Fail,
    props<{error: string}>()
)
