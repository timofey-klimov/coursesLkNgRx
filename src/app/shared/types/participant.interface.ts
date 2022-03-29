import { UserState } from "./userState.enum";

export interface IParticipant {
    id: number,
    login: string,
    name: string,
    surname: string,
    state: UserState
    role: string
}