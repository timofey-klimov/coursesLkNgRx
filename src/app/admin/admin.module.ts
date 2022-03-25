import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../shared/guards/auth.guard";
import { AdminLayoutComponent } from "./components/admin-layout/admin-layout.component";
import { AdminComponent } from "./components/admin/admin.component";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import { UserManagmentComponent } from "./components/userManagment/user-managment.component";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./store/reducer";
import { UsersApiService } from "./services/usersApi.service";
import { EffectsModule } from "@ngrx/effects";
import { ManageUsersEffect } from "./store/effects/manageUsers.effect";
import { SpinnerModule } from "../shared/modules/spinner/spinner.module";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from "@angular/forms";
import { CreateUserComponent } from "./components/createUser/createUser.component";
import { CreateParticipantEffect } from "./store/effects/createParticipant.effect";
import { MatSelectModule } from '@angular/material/select';
import { BlockParticipantEffects } from "./store/effects/blockParticipant.effects";
import { UnBlockParticipantEffect } from "./store/effects/ublockParticipant.effect";



const routes: Routes = [
    { path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
        { path: '', component: AdminComponent},
        { path: 'manage-users', component: UserManagmentComponent}
    ]}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forChild(routes),
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule,
        MatExpansionModule,
        ScrollingModule,
        MatSnackBarModule,
        MatStepperModule,
        MatCardModule,
        StoreModule.forFeature('adminPage', reducer),
        EffectsModule.forFeature([ManageUsersEffect, CreateParticipantEffect, BlockParticipantEffects, UnBlockParticipantEffect]),
        SpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        ReactiveFormsModule,
        MatSelectModule

    ],
    declarations: [
        AdminComponent, 
        AdminLayoutComponent, 
        UserManagmentComponent, 
        CreateUserComponent
    ],
    exports: [RouterModule],
    providers: [UsersApiService]
})
export class AdminModule {

}