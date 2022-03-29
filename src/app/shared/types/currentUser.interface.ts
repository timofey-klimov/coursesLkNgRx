import { UserState } from "./userState.enum";

export interface ICurrentUser {
    name: string;
    surname: string;
    login: string;
    role: string;
    state: UserState;
}