import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { getUserAvatarAction, getUserAvatarFailed, getUserAvatarSuccess } from "../actions/getUserAvatar.action";
import { userSelector } from "../selector";

@Injectable()
export class GetAvatarEffect {

    constructor(private actions$: Actions, private api: AuthService, private store: Store) {

    }

    getAvatar$ = createEffect(() => this.actions$.pipe(
        ofType(getUserAvatarAction),
        withLatestFrom(this.store.select(userSelector)),
        switchMap(([action, user]) => {
            if (user?.avatar) {
                return of(getUserAvatarSuccess({response: user.avatar}))
            } else {
                return this.api.getUserAvatar()
                    .pipe(
                        map(x =>  {
                            return getUserAvatarSuccess({response: x}) 
                        }),
                        catchError((err: HttpErrorResponse) =>  {
                            return of(getUserAvatarFailed())
                        })
                    )
            }
        })
    ))
}