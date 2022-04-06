import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { TeachersApiService } from "../../../shared/apiClients/teachersApi.service";
import { getTeachersAction, getTeachersAction_Failed, getTeachersAction_Success } from "../action/getTeachers.actions";

@Injectable()
export class GetTeachersEffect {
    constructor(private actions$: Actions, private api: TeachersApiService, private notify: NotificationService) {
    
    }

    $getTeacherEffect = createEffect(() => this.actions$.pipe(
        ofType(getTeachersAction),
        switchMap(x => {
            return this.api.getTeachers(x.request).pipe(
                map(x => getTeachersAction_Success({response: x.data})),
                catchError((err: HttpErrorResponse) => {
                    return of(getTeachersAction_Failed({message: 'Неизвестная ошибка'}))
                })
            )
        })
    ))
}