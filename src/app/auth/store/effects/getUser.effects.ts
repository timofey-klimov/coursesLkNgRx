import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { UserState } from "src/app/shared/types/userState.enum";
import { AuthService } from "../../services/auth.service";
import { getUserAction, getUserFailedAction, getUserSuccessAction } from "../actions/getUser.actions";

@Injectable()
export class GetUserEffects {

    constructor(private actions$: Actions, private authService: AuthService, private router: Router) {

    }

    $getUser = createEffect(() => this.actions$.pipe(
        ofType(getUserAction),
        switchMap(x => {
            const token = localStorage.getItem('token');

            if (!token) {
                return of(getUserFailedAction());
            }

            return this.authService.getUser()
                .pipe(
                    map(x => getUserSuccessAction({user: x.data})),
                    catchError((err: HttpErrorResponse) => of(getUserFailedAction()))
                )
        })
    ))

    $getUserFailed = createEffect(() => this.actions$.pipe(
        ofType(getUserFailedAction),
        tap(x => this.router.navigate(['/login']))
    ), {dispatch: false})

    $getuserSuccess = createEffect(() => this.actions$.pipe(
        ofType(getUserSuccessAction),
        tap(x => {
            if (x.user.state != UserState.Created) {
                if (x.user.roles.includes('User')) {
                    this.router.navigate(['/user'])
                    return;
                }

                if(x.user.roles.includes('Admin')) {
                    this.router.navigate(['/admin'])
                    return;
                }

                if (x.user.roles.includes('Manager')) {
                    this.router.navigate(['/manager'])
                    return;
                }
            }
        })
    ), {dispatch: false})
}