import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MaterialModule } from "src/app/materials/materials.module";
import { SharedModule } from "src/app/shared/shared.module";
import { TeacherStudentsComponent } from "./components/dashboard/teacher-students.component";
import { StudentInfoComponent } from "./components/studentInfo/studentInfo.component";
import { GetStudenInfoEffect } from "./store/effects/getStudentInfo.effect";
import { GetStudentsEffect } from "./store/effects/getStudents.effect";
import { reducer } from "./store/reducer";

const routes: Routes = [
    { path: '', component: TeacherStudentsComponent }
]

@NgModule({
    declarations:[TeacherStudentsComponent,StudentInfoComponent],
    imports:[
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('teacherStudents', reducer),
        EffectsModule.forFeature([
            GetStudentsEffect,
            GetStudenInfoEffect
        ])
    ],
    exports: [RouterModule],
    providers:[]
})
export class TeacherStudentsModule {

}