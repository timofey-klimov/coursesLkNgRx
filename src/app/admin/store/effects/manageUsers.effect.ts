import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { UsersApiService } from "../../services/usersApi.service";
import { getUsersAction, getUsersFailAction, getUsersSuccessAction } from "../action/manageUsers.actions";

@Injectable()
export class ManageUsersEffect {


    constructor(private api: UsersApiService, private actions$: Actions) {

    }

    getUsersEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getUsersAction),
        switchMap(x => {
            return this.api.getUsers(x.request)
                .pipe(
                    map(x => getUsersSuccessAction({users: x.data})),
                    catchError((err: HttpErrorResponse) => of(getUsersFailAction({error: 'Произолша ошибка'})))
                )
        })
    ))
}