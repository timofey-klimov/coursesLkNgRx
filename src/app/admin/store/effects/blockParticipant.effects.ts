import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { UserState } from "src/app/shared/types/userState.enum";
import { UsersApiService } from "../../../shared/apiClients/usersApi.service";
import { blockParticipantAction, blockParticipantFailedAction, blockParticipantSuccessAction } from "../action/blockParticipant.action";
import { managedUsersSelector } from "../selector";

@Injectable()
export class BlockParticipantEffects {

    constructor(private actions$: Actions, private api: UsersApiService, private notify: NotificationService) {

    }

    $createBlockParticipantEffect = createEffect(() => this.actions$.pipe(
        ofType(blockParticipantAction),
        switchMap(x => {
            return this.api.blockUser(x.id)
                .pipe(
                    map((x) => {
                        return blockParticipantSuccessAction({id: x.data})
                    }),
                    catchError((err: HttpErrorResponse) => of(blockParticipantFailedAction({message: 'Неизвестная ошибка'})))
                )
        })
    ))

    $failedEffect = createEffect(() => this.actions$.pipe(
        ofType(blockParticipantFailedAction),
        tap(x => this.notify.showError('Внимание', x.message))
    ), { dispatch: false })
}