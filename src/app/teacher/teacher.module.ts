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

const routes: Routes = [
    { path: 'teacher', component: TeacherLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', component: TeacherComponent },
        { path: 'manage-tests', component: ManageTestsComponent}
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('teacherPage', reducer),
        EffectsModule.forFeature([GetTeacherTestsEffect]),
        MaterialModule,
        ReactiveFormsModule,
        QuillModule,
        FormsModule],
    declarations: [TeacherComponent, TeacherLayoutComponent, ManageTestsComponent, CreateTestComponent],
    exports: [RouterModule],
    providers: [TeachersApiService]
})
export class TeacherModule {

}