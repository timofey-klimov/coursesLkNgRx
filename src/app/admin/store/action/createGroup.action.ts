import { createAction, props } from "@ngrx/store";
import { IGroup } from "src/app/shared/types/group.interface";
import { ICreateGroupRequest } from "../../types/createGroup.request";
import { ActionTypes } from "../actionTypes";

export const createGroupAction = createAction(
    ActionTypes.CreateGroup,
    props<{request: ICreateGroupRequest}>()
)

export const createGroupSuccessAction = createAction(
    ActionTypes.CreateGroup_Success,
    props<{group: IGroup}>()
)

export const createGroupFailedAction = createAction(
    ActionTypes.CreateGroup_Failed,
    props<{message: string}>()
)