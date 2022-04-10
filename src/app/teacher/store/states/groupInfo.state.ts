import { IGetGroupInfoResponse } from "../../types/getGroupInfo.response";

export interface IGroupInfoState {
    isLoading: boolean;
    wasError: boolean;
    groupInfo: IGetGroupInfoResponse
}