import { createAction, props } from "@ngrx/store";
import { IGetUsersRequest } from "../../types/getUsers.request";
import { IGetUsersResponse } from "../../types/getUsers.response";
import { ActionTypes } from "../actionTypes";

export const getParticipantsAction = createAction(
    ActionTypes.GetManagedParticipants,
    props<{request: IGetUsersRequest}>()
)

export const getParticipantsSuccessAction = createAction(
    ActionTypes.GetManagedParticipants_Success,
    props<{users: IGetUsersResponse}>()
)

export const getParticipantsFailAction = createAction(
    ActionTypes.GetManagedParticipants_Fail,
    props<{error: string}>()
)
