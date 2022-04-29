import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MaterialModule } from "src/app/materials/materials.module";
import { SharedModule } from "src/app/shared/shared.module";
import { TeacherGroupsComponent } from "./components/dashboard/teacher-groups.component";
import { GroupInfoComponent } from "./components/group-info/group-info.component";
import { GetGroupInfoEffect } from "./store/effects/getGroupInfo.effect";
import { GetGroupsEffect } from "./store/effects/getGroups.effect";
import { reducer } from "./store/reducer";

const routes: Routes = [
    {path: '', component: TeacherGroupsComponent}
]

@NgModule({
    declarations: [
        TeacherGroupsComponent,
        GroupInfoComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        StoreModule.forFeature('teacherGroups', reducer),
        EffectsModule.forFeature([
            GetGroupsEffect,
            GetGroupInfoEffect
        ]),
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class TeacherGroupsModule {

}