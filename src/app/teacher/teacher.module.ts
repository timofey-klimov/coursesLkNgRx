import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
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
import { SpinnerModule } from "../shared/modules/spinner/spinner.module";
import { TestApiService } from "../shared/apiClients/testApi.service";
import { StudentsDashboardComponent } from "./components/studentsDashboard/students-dashboard.component";
import { GetStudentsEffect } from "./store/effects/getStudents.effect";
import { SharedModule } from "../shared/shared.module";
import { StudentInfoComponent } from "./components/studentsDashboard/studentInfo/studentInfo.component";
import { GetStudentInfoEffect } from "./store/effects/getStudentInfo.effect";

const routes: Routes = [
    { path: 'teacher', component: TeacherLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'tests-dashboard', pathMatch: 'full'},
        { path: 'tests-dashboard', loadChildren: () => import('./teacher-tests/teacher-tests.module').then(x => x.TeacherTestsModule) },
        { path: 'groups-dashboard', loadChildren: () => import('./teacher-groups/teacher-groups.module').then(x => x.TeacherGroupsModule) },
        { path: 'students-dashboard', component: StudentsDashboardComponent }
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('teacherPage', reducer),
        EffectsModule.forFeature([
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
        StudentsDashboardComponent,
        StudentInfoComponent],

    exports: [RouterModule],
    providers: [TeachersApiService, TestApiService]
})
export class TeacherModule {

}