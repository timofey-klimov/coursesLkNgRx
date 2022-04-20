import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { TeachersApiService } from "src/app/shared/apiClients/teachersApi.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { getManagedStudentsAction, getManagedStudentsFailedAction, getManagedStudentsSuccessAction } from "../actions/getManagedStudents.action";

@Injectable()
export class GetStudentsEffect {

    constructor(private actions: Actions, private api: TeachersApiService, private notify: NotificationService) {

    }

    getStundets$ = createEffect(() => this.actions.pipe(
        ofType(getManagedStudentsAction),
        switchMap(x => {
            return this.api.getManagedStudents(x.request)
                .pipe(
                    map(x => getManagedStudentsSuccessAction({response: x.data})),
                    catchError((err: HttpErrorResponse) => of(getManagedStudentsFailedAction({message: 'Неизвестная ошибка'})))
                )
        })
    ))

    getStudentsFailed$ = createEffect(() => this.actions.pipe(
        ofType(getManagedStudentsFailedAction),
        tap(x => this.notify.showError('Внимание', x.message))
    ), { dispatch: false})
}