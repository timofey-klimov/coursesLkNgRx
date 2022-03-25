import { createAction, props } from "@ngrx/store";
import { ICreateParticipant } from "../../types/createParticipant.request";
import { IUser } from "../../../shared/types/user.interface";
import { ActionTypes } from "../actionTypes";

export const createParticipantAction = createAction(
    ActionTypes.CreateParticipant,
    props<{request: ICreateParticipant}>()
)

export const createParticipantSuccessAction = createAction(
    ActionTypes.CreateParticipant_Success,
    props<{user:IUser}>()
)

export const createParticipantFailedAction = createAction(
    ActionTypes.CreateParticipant_Failed,
    props<{error: string}>()
)