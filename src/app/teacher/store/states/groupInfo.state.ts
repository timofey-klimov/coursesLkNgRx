import { GetGroupInfoResponse } from "../../types/getGroupInfo.response";

export interface IGroupInfoState {
    isLoading: boolean;
    wasError: boolean;
    groupInfo: GetGroupInfoResponse
}