import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { dispatch } from "rxjs/internal/observable/pairs";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { GroupsApiService } from "src/app/shared/apiClients/groupsApi.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { removeStudentsAction, removeStudentsAction_Failed, removeStudentsAction_Success } from "../action/removeStudents.action";

@Injectable()
export class RemoveStudentsEffect {
    constructor(private actions$: Actions, private api: GroupsApiService, private notify: NotificationService) {
    
    }
    removeStudentsEffect$ = createEffect(() => this.actions$.pipe(
        ofType(removeStudentsAction),
        switchMap(act => {
            return this.api.removeStudents(act.request)
                .pipe(
                    map(x => removeStudentsAction_Success({response: x.data})),
                    catchError((error: HttpErrorResponse) => of(removeStudentsAction_Failed({error: 'Неизвестная ошибка!'}))
                )
            )
        })
    ))
    removeStudentsFailedEffect = createEffect(() => this.actions$.pipe(
        ofType(removeStudentsAction_Failed),
        tap((x) => this.notify.showError('Внимание', x.error))
    ), {dispatch: false})
}