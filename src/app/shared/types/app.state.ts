import { IAdminPageState } from "src/app/admin/store/states/admin-page.state";
import { IAuthState } from "src/app/auth/types/auth.state";
import { ITeacherPageState } from "src/app/teacher/store/teacher-page.state";

export interface IAppState {
    auth: IAuthState;
    adminPage: IAdminPageState,
    teacherPage: ITeacherPageState
}