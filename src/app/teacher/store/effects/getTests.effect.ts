import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { TeachersApiService } from "src/app/shared/apiClients/teachersApi.service";
import { getTestsAction, getTestsFailedAction, getTestsSuccessAction } from "../actions/getTests.actions";

@Injectable()
export class GetTeacherTestsEffect {

    constructor(private actions: Actions, private api: TeachersApiService) {

    }

    getTeachersEffect$ = createEffect(() => this.actions.pipe(
        ofType(getTestsAction),
        switchMap(x => {
            return this.api.getTests(x.request)
                .pipe(
                    map(x => getTestsSuccessAction({response: x.data})),
                    catchError((err: HttpErrorResponse) => of(getTestsFailedAction({message: 'Неизвестная ошибка'})))
                )
        })
    ))
}