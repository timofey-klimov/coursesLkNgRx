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

const routes: Routes = [
    { path: 'teacher', component: TeacherLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', component: TeacherComponent },
        { path: 'manage-tests', component: ManageTestsComponent },
        { path: 'create-test', component: CreateTestComponent}
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('teacherPage', reducer),
        EffectsModule.forFeature([GetTeacherTestsEffect, CreateTestEffect]),
        MaterialModule,
        SpinnerModule,
        ReactiveFormsModule,
        QuillModule,
        FormsModule],
    declarations: [TeacherComponent, TeacherLayoutComponent, ManageTestsComponent, CreateTestComponent],
    exports: [RouterModule],
    providers: [TeachersApiService, TestApiService]
})
export class TeacherModule {

}