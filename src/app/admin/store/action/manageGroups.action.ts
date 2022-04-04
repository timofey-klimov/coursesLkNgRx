import { createAction, props } from "@ngrx/store";
import { IGetGroupsRequest } from "../../types/getGroups.request";
import { IGetGroupsResponse } from "../../types/getGroups.response";
import { ActionTypes } from "../actionTypes";

export const getGroupsAction = createAction(
    ActionTypes.GetGroups,
    props<{request: IGetGroupsRequest}>()
)

export const getGroupsActionSuccess = createAction(
    ActionTypes.GetGroupsSuccess,
    props<{groups: IGetGroupsResponse}>()
)

export const getGroupsActionFailed = createAction(
    ActionTypes.GetGroupsFailed,
    props<{message: string}>()
)