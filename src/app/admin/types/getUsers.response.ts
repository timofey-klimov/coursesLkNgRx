import { IParticipant } from "../../shared/types/participant.interface";

export interface IGetUsersResponse {
    data: IParticipant[],
    count: number
}