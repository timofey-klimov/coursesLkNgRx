import { createAction } from "@ngrx/store";
import { ActionTypes } from "../actionsTypes";

export const getGroupInfoAction = createAction(
    ActionTypes.GetGroupInfo 
)