import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { CreateTestComponent } from "./components/testsDashboard/createTest/createTest.component";
import { TestsDashboardComponent } from "./components/testsDashboard/tests-dashboard.component";
import { TeacherComponent } from "./components/teacherLayout/teacher/teacher.component";
import { TeacherLayoutComponent } from "./components/teacherLayout/teacherLayout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../materials/materials.module";
import { QuillModule } from "ngx-quill";
import { CommonModule } from "@angular/common";
import { reducer } from "./store/reducer";
import { StoreModule } from "@ngrx/store";
import { TeachersApiService } from "../shared/apiClients/teachersApi.service";
import { EffectsModule } from "@ngrx/effects";
import { GetTeacherTestsEffect } from "./store/effects/getTests.effect";
import { SpinnerModule } from "../shared/modules/spinner/spinner.module";
import { TestApiService } from "../shared/apiClients/testApi.service";
import { CreateTestEffect } from "./store/effects/createTest.effect";
import { WarningExitGuard } from "../shared/guards/warningExit.guard";
import { GetGroupsEffect } from "./store/effects/getGroups.effect";
import { GroupsDashboardComponent } from "./components/groupsDashboard/groupsDashboard.component";
import { GroupInfoComponent } from "./components/groupsDashboard/groupInfo/groupInfo.component";
import { GetGroupInfoEffect } from "./store/effects/getGroupInfo.effect";
import { IconDirective } from "../shared/directives/icon.directive";
import { StudentsDashboardComponent } from "./components/studentsDashboard/students-dashboard.component";
import { GetStudentsEffect } from "./store/effects/getStudents.effect";
import { SharedModule } from "../shared/shared.module";
import { StudentInfoComponent } from "./components/studentsDashboard/studentInfo/studentInfo.component";
import { GetStudentInfoEffect } from "./store/effects/getStudentInfo.effect";

const routes: Routes = [
    { path: 'teacher', component: TeacherLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'tests-dashboard', pathMatch: 'full'},
        { path: 'tests-dashboard', component: TestsDashboardComponent },
        { path: 'create-test', component: CreateTestComponent, canDeactivate: [WarningExitGuard]},
        { path: 'groups-dashboard', component: GroupsDashboardComponent },
        { path: 'students-dashboard', component: StudentsDashboardComponent }
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('teacherPage', reducer),
        EffectsModule.forFeature([
            GetTeacherTestsEffect, 
            CreateTestEffect, 
            GetGroupsEffect,
            GetGroupInfoEffect,
            GetStudentsEffect,
            GetStudentInfoEffect]),
        MaterialModule,
        SpinnerModule,
        ReactiveFormsModule,
        QuillModule,
        FormsModule,
        SharedModule],

    declarations: [
        TeacherComponent, 
        TeacherLayoutComponent, 
        TestsDashboardComponent, 
        CreateTestComponent, 
        GroupsDashboardComponent,
        GroupInfoComponent,
        IconDirective,
        StudentsDashboardComponent,
        StudentInfoComponent],

    exports: [RouterModule],
    providers: [TeachersApiService, TestApiService]
})
export class TeacherModule {

}