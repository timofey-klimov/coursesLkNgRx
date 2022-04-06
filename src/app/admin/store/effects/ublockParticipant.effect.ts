import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UsersApiService } from "../../../shared/apiClients/usersApi.service";
import { unblockParticipantAction, unblockParticipantFailedAction, unblockParticipantSuccessAction } from "../action/unblockParticipant.action";

@Injectable()
export class UnBlockParticipantEffect {

    constructor(private actions$: Actions, private userApi: UsersApiService, private notify: NotificationService) {

    }

    $unblockEffect = createEffect(() => this.actions$.pipe(
        ofType(unblockParticipantAction),
        switchMap(x => {
            return this.userApi.unblockUser(x.id)
                .pipe(
                    map(res => unblockParticipantSuccessAction({id: res.data})),
                    catchError((err: HttpErrorResponse) => of(unblockParticipantFailedAction({message: 'Неизвестная ошибка'})))
                )
        })
    ))

    $error = createEffect(() => this.actions$.pipe(
        ofType(unblockParticipantFailedAction),
        tap(res => this.notify.showError('Внимание', res.message))
    ), { dispatch: false})
}