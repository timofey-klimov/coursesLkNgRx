import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { GroupsApiService } from "../../../shared/apiClients/groupsApi.service";
import { getGroupsAction, getGroupsActionFailed, getGroupsActionSuccess } from "../action/manageGroups.action";

@Injectable()
export class ManageGroupsEffects {

    constructor(private api: GroupsApiService, private actions$: Actions, private notify: NotificationService) {

    }

    getGroups$ = createEffect(() => this.actions$.pipe(
        ofType(getGroupsAction),
        switchMap(x => {
            return this.api.getGroups(x.request)
                .pipe(
                    map(x => getGroupsActionSuccess({groups: x.data})),
                    catchError((err: HttpErrorResponse) => {
                        return of(getGroupsActionFailed({message: 'Неизвестная ошибка'}))
                    })
                )
        })
    ))

    getGroupsFailed$ = createEffect(() => this.actions$.pipe(
        ofType(getGroupsActionFailed),
        tap((x) => this.notify.showError('Внимание', x.message))

    ), {dispatch: false})

}