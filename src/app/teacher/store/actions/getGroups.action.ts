import { createAction, props } from "@ngrx/store";
import { IGetGroupsRequest } from "../../teacher-groups/types/getGroups.request";
import { IGetGroupsResponse } from "../../teacher-groups/types/getGroups.response";
import { ActionTypes } from "../actionsTypes";

export const getGroupsAction = createAction(
    ActionTypes.GetTeacherGroups,
    props<{request: IGetGroupsRequest}>()
)

export const getGroupsSuccessAction = createAction(
    ActionTypes.GetTeacherGroupsSuccess,
    props<{response: IGetGroupsResponse}>()
)

export const getGroupsFailedAction = createAction(
    ActionTypes.GetTeacherGroupsFailed,
    props<{message: string}>()
)