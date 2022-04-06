import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UsersApiService } from "../../../shared/apiClients/usersApi.service";
import { getParticipantsAction, getParticipantsFailAction, getParticipantsSuccessAction } from "../action/manageUsers.actions";

@Injectable()
export class ManageUsersEffect {


    constructor(private api: UsersApiService, private actions$: Actions, private notify: NotificationService) {

    }

    getParticipantsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getParticipantsAction),
        switchMap(x => {
            return this.api.getUsers(x.request)
                .pipe(
                    map(x => getParticipantsSuccessAction({users: x.data})),
                    catchError((err: HttpErrorResponse) => of(getParticipantsFailAction({error: 'Произошла ошибка'})))
                )
        })
    ))

    getParticipantsFailedEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getParticipantsFailAction),
        tap(x => this.notify.showError('Внимание', x.error))
    ), {dispatch: false})
}