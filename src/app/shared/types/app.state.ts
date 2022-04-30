import { IAdminPageState } from "src/app/admin/store/states/adminPage.state";
import { IAuthState } from "src/app/auth/types/auth.state";
import { ITeacherGroupsState } from "src/app/teacher/teacher-groups/store/teacheGroups.state";
import { ITeacherStudentsState } from "src/app/teacher/teacher-students/store/teacher-students.state";
import { ITeacherTestsState } from "src/app/teacher/teacher-tests/store/teacher-tests.state";

export interface IAppState {
    auth: IAuthState;
    adminPage: IAdminPageState,
    teacherTests: ITeacherTestsState,
    teacherGroups: ITeacherGroupsState,
    teacherStudents: ITeacherStudentsState
}