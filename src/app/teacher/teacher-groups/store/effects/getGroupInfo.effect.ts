import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { TeachersApiService } from "src/app/shared/apiClients/teachersApi.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { getGroupInfoAction, getGroupInfoFailedAction, getGroupInfoSuccessAction } from "../actions/getGroupInfo.action";

@Injectable()
export class GetGroupInfoEffect {

    constructor(private actions$: Actions, private api:TeachersApiService, private notify: NotificationService) {

    }

    getGroupInfoEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getGroupInfoAction),
        switchMap(x => {
            return this.api.getGroupInfo(x.request)
                .pipe(
                    map(x => getGroupInfoSuccessAction({response: x.data})),
                    catchError((err: HttpErrorResponse) => of(getGroupInfoFailedAction({message: 'Неизвестная ошибка'})))
            )
        })
    ))

    getGroupInfoFailedEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getGroupInfoFailedAction),
        tap(x => this.notify.showError('Ошибка',x.message))
    ), {dispatch: false})
}