import { IAdminPageState } from "src/app/admin/store/states/adminPage.state";
import { IAuthState } from "src/app/auth/types/auth.state";
import { ITeacherPageState } from "src/app/teacher/store/states/teacher-page.state";
import { ITeacherGroupsState } from "src/app/teacher/teacher-groups/store/teacheGroups.state";
import { ITeacherTestsState } from "src/app/teacher/teacher-tests/store/teacher-tests.state";

export interface IAppState {
    auth: IAuthState;
    adminPage: IAdminPageState,
    teacherPage: ITeacherPageState,
    teacherTests: ITeacherTestsState,
    teacherGroups: ITeacherGroupsState
}