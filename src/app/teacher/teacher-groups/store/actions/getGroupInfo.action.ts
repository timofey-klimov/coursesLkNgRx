import { createAction, props } from "@ngrx/store"
import { IGetGroupInfoRequest } from "src/app/teacher/teacher-groups/types/getGroupInfo.request"
import { IGetGroupInfoResponse } from "src/app/teacher/teacher-groups/types/getGroupInfo.response"
import { ActionTypes } from "../actionTypes"

export const getGroupInfoAction = createAction(
    ActionTypes.GetGroupInfo,
    props<{request:IGetGroupInfoRequest}>() 
)

export const getGroupInfoSuccessAction = createAction(
    ActionTypes.GetGroupInfoSuccess,
    props<{response: IGetGroupInfoResponse}>()
)

export const getGroupInfoFailedAction = createAction(
    ActionTypes.GetGroupInfoFailed,
    props<{message: string}>()
)