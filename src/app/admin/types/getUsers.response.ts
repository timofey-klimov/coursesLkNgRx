import { IPagination } from "src/app/shared/types/pagination.interface";
import { IParticipant } from "../../shared/types/participant.interface";

export interface IGetUsersResponse extends IPagination<IParticipant> {
    
}