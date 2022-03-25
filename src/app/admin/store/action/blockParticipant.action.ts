import { createAction, props } from "@ngrx/store";
import { ActionTypes } from "../actionTypes";

export const blockParticipantAction = createAction(
    ActionTypes.BlockParticipant,
    props<{id: number}>()
)

export const blockParticipantSuccessAction = createAction(
    ActionTypes.BlockParticipant_Success,
    props<{id: number}>()
)

export const blockParticipantFailedAction = createAction(
    ActionTypes.BlockParticipant_Failed,
    props<{message: string}>()
)

