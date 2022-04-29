import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { QuillModule } from "ngx-quill";
import { MaterialModule } from "src/app/materials/materials.module";
import { TeachersApiService } from "src/app/shared/apiClients/teachersApi.service";
import { TestApiService } from "src/app/shared/apiClients/testApi.service";
import { IconDirective } from "src/app/shared/directives/icon.directive";
import { WarningExitGuard } from "src/app/shared/guards/warningExit.guard";
import { SharedModule } from "src/app/shared/shared.module";
import { QuestionService } from "../services/question.service";
import { CreateTestComponent } from "./components/create-test/create-test.component";
import { TeacherTestsComponent } from "./components/dashboard/teacherTests.component";
import { CreateTestEffect } from "./store/effects/createTest.effect";
import { GetTeacherTestsEffect } from "./store/effects/getTests.effect";
import { reducer } from "./store/reducer";


const routes: Routes = [
    { path: '', component: TeacherTestsComponent },
    { path: 'create-test', component: CreateTestComponent,canDeactivate: [WarningExitGuard] }
]

@NgModule({
    imports: [
        QuillModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('teacherTests', reducer),
        EffectsModule.forFeature([
            GetTeacherTestsEffect,
            CreateTestEffect
        ]),
        SharedModule,
    ],
    declarations:[TeacherTestsComponent, CreateTestComponent],
    exports: [RouterModule],
    providers: [TeachersApiService, TestApiService, QuestionService]
})
export class TeacherTestsModule {

}