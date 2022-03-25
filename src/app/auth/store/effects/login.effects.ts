import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { loginAction, loginFailAction, loginSuccessAction } from "../actions/login.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { UserState } from "src/app/shared/types/userState.enum";

@Injectable()
export class LoginEffects {
    constructor(private authService: AuthService, private actions: Actions, private router: Router) {

    }

    $loginEffect = createEffect(() => this.actions.pipe(
        ofType(loginAction),
        switchMap(x => {
            return this.authService.login(x.request)
                .pipe(
                    map((response) => {
                        localStorage.setItem('token', response.data.token);
                        return loginSuccessAction({user: response.data.user})
                    }),
                    catchError((response: HttpErrorResponse)=> {
                        const code = response.status;
                        let message = "Неизвестная ошибка";
                        if (code === 102) {
                            message = "Неверный пользователь или пароль";
                        }

                        return of(loginFailAction({error: message}))
                    })
                )
        })
    ))

    $loginSuccessEffect = createEffect(() => this.actions.pipe(
        ofType(loginSuccessAction),
        tap(x => {
            
            if (x.user.state == UserState.Created) {
                return;
            }

            const roles = x.user.roles;
            if (roles.includes('User')) {
                this.router.navigate(['/user']);
                return;
            }

            if (roles.includes('Manager')) {
                this.router.navigate(['/manager']);
            }

            if (roles.includes('Admin')) {
                this.router.navigate(['/admin']);
                return;
            }

        })
    ), {dispatch: false})
}