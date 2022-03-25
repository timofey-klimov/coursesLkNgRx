import { IAdminPageState } from "src/app/admin/store/admin-page.state";
import { IAuthState } from "src/app/auth/types/auth.state";

export interface IAppState {
    auth: IAuthState;
    adminPage: IAdminPageState
}