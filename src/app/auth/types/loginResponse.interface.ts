import { ICurrentUser } from "src/app/shared/types/currentUser.interface";

export interface ILoginResponse {
    token: string;
    user: ICurrentUser
}