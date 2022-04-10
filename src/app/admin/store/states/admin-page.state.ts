import {  IManageGroupState } from "./manage-group.state";
import { IManageParticipantsState } from "./manageParticipants.state";

export interface IAdminPageState {
    isLoading: boolean,
    error: string,
    manageParticipantsState: IManageParticipantsState,
    manageGroupState: IManageGroupState
}