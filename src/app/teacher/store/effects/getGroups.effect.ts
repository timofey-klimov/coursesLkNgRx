import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { TeachersApiService } from "src/app/shared/apiClients/teachersApi.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { getGroupsAction, getGroupsFailedAction, getGroupsSuccessAction } from "../actions/getGroups.action";

@Injectable()
export class GetGroupsEffect {

    constructor(private actions$: Actions, private api: TeachersApiService, private notify: NotificationService) {

    }

    getGroupsEffect$ = createEffect(() =>  this.actions$.pipe(
        ofType(getGroupsAction),
        switchMap(x => {
            return this.api.getGroups(x.request)
                .pipe(
                    map(x => getGroupsSuccessAction({response: x.data})),
                    catchError((err: HttpErrorResponse) => of(getGroupsFailedAction({message: 'Неизвестная ошибка'})))
                )
        })
    ))

    getGroupsFailedEffect$ = createEffect(() => this.actions$.pipe(
        ofType(getGroupsFailedAction),
        tap(x => this.notify.showError('Ошибка', x.message))
    ), {dispatch: false})

}