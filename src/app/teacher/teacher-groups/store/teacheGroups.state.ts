import { IGetGroupInfoResponse } from "../types/getGroupInfo.response";
import { IGetGroupsResponse } from "../types/getGroups.response";

export interface IGroupInfoState {
    isLoading: boolean;
    wasError: boolean;
    groupInfo: IGetGroupInfoResponse
}

export const initialGroupInfoState: IGroupInfoState = {
    wasError: false,
    isLoading: false,
    groupInfo: null
}

export interface ITeacherGroupsState {
    isLoading: boolean,
    groups: IGetGroupsResponse,
    groupInfo: IGroupInfoState
}

export const initialTeacherGroupsState: ITeacherGroupsState = {
    isLoading: false,
    groups: null,
    groupInfo: initialGroupInfoState
}