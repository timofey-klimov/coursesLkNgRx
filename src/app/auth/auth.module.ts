import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { authReducer } from "./store/reducer";
import { AuthService } from "./services/auth.service";
import { EffectsModule } from "@ngrx/effects";
import { LoginEffects } from "./store/effects/login.effects";
import { SpinnerModule } from "../shared/modules/spinner/spinner.module";
import { ActivateUserEffects } from "./store/effects/activate.effects";
import { GetUserEffects } from "./store/effects/getUser.effects";
import { GetAvatarEffect } from "./store/effects/getAvatar.effect";

const routes: Routes = [
    { path: 'login', component: LoginComponent}
]

@NgModule({
    imports: [
        CommonModule, 
        RouterModule.forRoot(routes),
        MatProgressSpinnerModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        StoreModule.forFeature('auth', authReducer),
        EffectsModule.forFeature([
            LoginEffects,
            ActivateUserEffects,
            GetUserEffects,
            GetAvatarEffect
        ]),
        SpinnerModule
    ],
    declarations: [LoginComponent],
    exports: [RouterModule],
    providers: [AuthService]
})
export class AuthModule {

}