import { UserState } from "src/app/shared/types/userState.enum";

export interface IUser {
    id: number,
    login: string,
    name: string,
    surname: string,
    state: UserState
}