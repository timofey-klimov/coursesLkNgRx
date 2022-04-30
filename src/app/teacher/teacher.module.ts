import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { TeacherLayoutComponent } from "./teacher-layout/teacherLayout.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../materials/materials.module";
import { QuillModule } from "ngx-quill";
import { CommonModule } from "@angular/common";
import { StoreModule } from "@ngrx/store";
import { TeachersApiService } from "../shared/apiClients/teachersApi.service";
import { EffectsModule } from "@ngrx/effects";
import { SpinnerModule } from "../shared/modules/spinner/spinner.module";
import { TestApiService } from "../shared/apiClients/testApi.service";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    { path: 'teacher', component: TeacherLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'tests-dashboard', pathMatch: 'full'},
        {   
            path: 'tests-dashboard', 
            loadChildren: () => import('./teacher-tests/teacher-tests.module').then(x => x.TeacherTestsModule) 
        },
        { 
            path: 'groups-dashboard', 
            loadChildren: () => import('./teacher-groups/teacher-groups.module').then(x => x.TeacherGroupsModule) 
        },
        { 
            path: 'students-dashboard', 
            loadChildren: () => import('./teacher-students/teacher-students.module').then(x => x.TeacherStudentsModule) 
        }
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MaterialModule,
        SpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule],

    declarations: [
        TeacherLayoutComponent],

    exports: [RouterModule],
    providers: []
})
export class TeacherModule {

}