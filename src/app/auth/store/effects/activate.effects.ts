import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs/internal/observable/of";
import { catchError, map, switchMap, tap, withLatestFrom,} from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { activateAction, activateFailAction, activateSuccessAction } from "../actions/activate.actions";
import { userSelector } from "../selector";

@Injectable()
export class ActivateUserEffects {
    
    constructor(
        private actions$: Actions, 
        private router: Router, 
        private store: Store, 
        private authService: AuthService) {

    }

    activateUserEffect$ = createEffect(() => this.actions$.pipe(
        ofType(activateAction),
        switchMap((x) =>{
            return this.authService.activate(x.password)
                .pipe(
                    map(x => activateSuccessAction()),
                    catchError((err: HttpErrorResponse) => {
                        let message = "Неизвестная ошибка";
                        if (err.status === 102) {
                            message = "Пользователя не существует";
                        }
                        return of(activateFailAction({error: message}))
                    })
                )
        })
    ))

    activateUserSuccessEffect$ = createEffect(() => this.actions$.pipe(
        ofType(activateSuccessAction),
        withLatestFrom(this.store.select(userSelector)),
        tap(([type,user]) => {
            const role = user.role;
            if (role == 'User') {
                this.router.navigate(['/user']);
                return;
            }

            if (role == 'Teacher') {
                this.router.navigate(['/teacher']);
                return;
            }

            if (role == 'Admin') {
                this.router.navigate(['/admin']);
                return;
            }
        })
    ), {dispatch: false})
}