import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { AdminComponent } from "./components/admin/admin.component";
import { ParticipantManagmentComponent } from "./components/participantManagment/participant-managment.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/reducer";
import { UsersApiService } from "./services/usersApi.service";
import { EffectsModule } from "@ngrx/effects";
import { ManageUsersEffect } from "./store/effects/manageUsers.effect";
import { SpinnerModule } from "../shared/modules/spinner/spinner.module";
import { ReactiveFormsModule } from "@angular/forms";
import { CreateParticipantComponent } from "./components/createParticipant/createParticipant.component";
import { CreateParticipantEffect } from "./store/effects/createParticipant.effect";
import { BlockParticipantEffects } from "./store/effects/blockParticipant.effects";
import { UnBlockParticipantEffect } from "./store/effects/ublockParticipant.effect";
import { MaterialModule } from "../materials/materials.module";



const routes: Routes = [
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', component: AdminComponent},
        { path: 'manage-participants', component: ParticipantManagmentComponent}
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        StoreModule.forFeature('adminPage', reducer),
        EffectsModule.forFeature([ManageUsersEffect, CreateParticipantEffect, BlockParticipantEffects, UnBlockParticipantEffect]),
        SpinnerModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    declarations: [
        AdminComponent, 
        AdminLayoutComponent, 
        ParticipantManagmentComponent, 
        CreateParticipantComponent
    ],
    exports: [RouterModule, MaterialModule],
    providers: [UsersApiService]
})
export class AdminModule {

}