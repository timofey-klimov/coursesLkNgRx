import { ICurrentUser } from "src/app/shared/types/currentUser.interface";

export class IAuthState {
    isLoggedIn: boolean | null;
    user: ICurrentUser;
    isLoading: boolean;
    error: string | null;
}