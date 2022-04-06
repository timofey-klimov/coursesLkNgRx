import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { StudentsApiService } from "../../../shared/apiClients/studentsApi.service";
import { getAllStudentsAction, getAllStudentsAction_Failed, getAllStudentsAction_Success } from "../action/getAllStudents.action";

@Injectable()
export class GetAllStudentsEffect{
    constructor (private actions$: Actions, private api: StudentsApiService, private notify: NotificationService){

    }

    $getAllStudentsEffect = createEffect(() => this.actions$.pipe(
        ofType(getAllStudentsAction),
        switchMap(x => {
            return this.api.getAllStudents(x.request).pipe(
                map( x => getAllStudentsAction_Success({response: x.data})),
                catchError((err: HttpErrorResponse) => {
                    return of(getAllStudentsAction_Failed({message: 'Неизвестная ошибка'}))
                })
            )
        })
    ))
}