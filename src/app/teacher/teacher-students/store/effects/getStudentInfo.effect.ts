import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { TeachersApiService } from "src/app/shared/apiClients/teachersApi.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { getStudentInfoAction, getStudentInfoFailedAction, getStudentInfoSuccessAction } from "../actions/getStudentInfo.action";
import { studentInfoSelector } from "../selector";

@Injectable()
export class GetStudenInfoEffect {
    constructor(
        private actions$: Actions, 
        private api: TeachersApiService, 
        private store: Store,
        private notify: NotificationService) {
        
    }

    getStudentInfo = createEffect(() => this.actions$.pipe(
        ofType(getStudentInfoAction),
        withLatestFrom(this.store.select(studentInfoSelector)),
        switchMap(([action, studentInfo]) => {

            if (action.request.studentId === studentInfo?.studentDto?.id) {
                return of(getStudentInfoSuccessAction({response:studentInfo}))
            } else {
                return this.api.getStudentInfo(action.request)
                    .pipe(
                        map(x => getStudentInfoSuccessAction({response: x.data})),
                        catchError((err: HttpErrorResponse) => {
                            let message = 'Неизвестная ошибка';
                            if (err.status === 104) {
                                message = 'Пользователь не найден';
                            }
                            return of(getStudentInfoFailedAction({message: message}))
                        })
                    )
            }
        })
    ))

    getStudentInfoFailed$ = createEffect(() => this.actions$.pipe(
        ofType(getStudentInfoFailedAction),
        tap(x => this.notify.showError('Внимание', x.message))
    ), { dispatch: false})
}
