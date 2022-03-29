import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UsersApiService } from "../../services/usersApi.service";
import { createParticipantAction, createParticipantFailedAction, createParticipantSuccessAction } from "../action/createParticipant.actions";

@Injectable()
export class CreateParticipantEffect {

    constructor(private actions$: Actions, private api: UsersApiService, private notify: NotificationService) {

    }

    $createEffect = createEffect(() => this.actions$.pipe(
        ofType(createParticipantAction),
        switchMap(x => {
            return this.api.createUser(x.request)
                .pipe(
                    map(x => createParticipantSuccessAction({user: x.data})),
                    catchError((err:HttpErrorResponse) => {
                        let message = 'Произошла ошибка'
                        
                        if (err.status === 100) {
                            message = 'Пользователь уже существует'
                        }

                        if (err.status === 101) {
                            message = 'Логин занят'
                        }
                        return of(createParticipantFailedAction({error: message}))
                    })
                )
        })
    ))

    $createFailedEffect = createEffect(() => this.actions$.pipe(
        ofType(createParticipantFailedAction),
        tap(x => {
            this.notify.showError('Внимание', x.error)
        })
    ), {dispatch: false})

    $createSuccessEffect = createEffect(() => this.actions$.pipe(
        ofType(createParticipantSuccessAction),
        tap(x => {
            this.notify.showSuccess('Успешно', 'Пользователь создан')
        })
    ), {dispatch: false})
}