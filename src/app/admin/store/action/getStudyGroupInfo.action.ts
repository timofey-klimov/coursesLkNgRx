import { createAction, props } from "@ngrx/store";
import { IGetStudentsRequest } from "../../types/getStudents.request";
import { IGetStudyGroupInfoResponse } from "../../types/getStudyGroupInfo.response";
import { ActionTypes } from "../actionTypes";

export const getStudyGroupInfoAction = createAction(
    ActionTypes.GetStudyGroupInfo,
    props<{request: IGetStudentsRequest}>()
)

export const getStudyGroupInfoSuccessAction = createAction(
    ActionTypes.GetStudyGroupInfo_Success,
    props<{groupInfo: IGetStudyGroupInfoResponse}>()
)

export const getStudyGroupInfoFailedAction = createAction(
    ActionTypes.GetStudyGroupInfo_Failed,
    props<{message: string}>()
)