import { IGetStudyGroupInfoResponse } from "../../types/getStudyGroupInfo.response";

export interface IGetGroupInfoState {
    isLoading: boolean;
    wasError: boolean;
    groupInfo: IGetStudyGroupInfoResponse;
}