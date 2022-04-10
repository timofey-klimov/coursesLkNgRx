import { IGetUsersResponse } from "../../types/getUsers.response";

export interface IManageParticipantsState {
    manageUsers: IGetUsersResponse,
    currentPage: number,
    itemsPerPage: number,
}