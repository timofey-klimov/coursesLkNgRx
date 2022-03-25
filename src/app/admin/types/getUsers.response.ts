import { IUser } from "../../shared/types/user.interface";

export interface IGetUsersResponse {
    data: IUser[],
    count: number
}