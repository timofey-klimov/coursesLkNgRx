import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const unblockParticipantAction = createAction(
    ActionTypes.UnBlockParticipant,
    props<{id: number}>()
)

export const unblockParticipantSuccessAction = createAction(
    ActionTypes.UnBlockParticipantSuccess,
    props<{id: number}>()
)

export const unblockParticipantFailedAction = createAction(
    ActionTypes.UnBlockParticipantFailed,
    props<{message: string}>()
)

