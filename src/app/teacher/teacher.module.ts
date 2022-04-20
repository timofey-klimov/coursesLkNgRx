import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { CreateTestComponent } from "./components/createTest/createTest.component";
import { ManageTestsComponent } from "./components/manageTests/manageTests.component";
import { TeacherComponent } from "./components/teacher/teacher.component";
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
import { ManageGoupsComponent } from "./components/manageGroups/manageGroups.component";
import { GroupInfoComponent } from "./components/groupInfo/groupInfo.component";
import { GetGroupInfoEffect } from "./store/effects/getGroupInfo.effect";
import { IconDirective } from "../shared/directives/icon.directive";
import { ManageStudentsComponent } from "./components/manageStudents/manageStudents.component";
import { GetStudentsEffect } from "./store/effects/getStudents.effect";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: 'teacher', component: TeacherLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'manage-tests', pathMatch: 'full'},
        { path: 'manage-tests', component: ManageTestsComponent },
        { path: 'create-test', component: CreateTestComponent, canDeactivate: [WarningExitGuard]},
        { path: 'manage-groups', component: ManageGoupsComponent },
        { path: 'manage-students', component: ManageStudentsComponent }
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
            GetStudentsEffect]),
        MaterialModule,
        SpinnerModule,
        ReactiveFormsModule,
        QuillModule,
        FormsModule,
        SharedModule],

    declarations: [
        TeacherComponent, 
        TeacherLayoutComponent, 
        ManageTestsComponent, 
        CreateTestComponent, 
        ManageGoupsComponent,
        GroupInfoComponent,
        IconDirective,
        ManageStudentsComponent],

    exports: [RouterModule],
    providers: [TeachersApiService, TestApiService]
})
export class TeacherModule {

}