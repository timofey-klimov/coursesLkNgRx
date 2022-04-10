import { createAction, props } from "@ngrx/store";
import { IGetGroupInfoRequest } from "../../types/getGroupInfo.request";
import { IGetGroupInfoResponse } from "../../types/getGroupInfo.response";
import { ActionTypes } from "../actionsTypes";

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