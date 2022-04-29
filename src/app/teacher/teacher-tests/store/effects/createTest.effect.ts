import { Location } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { TestApiService } from "src/app/shared/apiClients/testApi.service";
import { NotificationService } from "src/app/shared/services/notification.service";
import { createTestAction, createTestFailedAction, createTestSuccessAction } from "../actions/createTest.action";

@Injectable()
export class CreateTestEffect {
    constructor(
        private actions: Actions, 
        private api: TestApiService, 
        private notify: NotificationService, 
        private location: Location) {

    }

    createTestEffect$ = createEffect(() => this.actions.pipe(
        ofType(createTestAction),
        switchMap(x => {
            return this.api.createTest(x.request)
                .pipe(
                    map(x => createTestSuccessAction({response: x.data})),
                    catchError((err: HttpErrorResponse) => {
                        let message = 'Неизвестная ошибка';
                        if (err.status === 301) {
                            message = 'Тест с таким именем уже существует'
                        }
                        return of(createTestFailedAction({message}))
                    })
                )
        })
    ))

    createTestSuccessEffect$ = createEffect(() => this.actions.pipe(
        ofType(createTestSuccessAction),
        tap(x => {
            this.notify.showSuccess('Успешно', 'Тест создан');
            this.location.back();
        })
    ), {dispatch: false})

    createTestFailedEffect$ = createEffect(() => this.actions.pipe(
        ofType(createTestFailedAction),
        tap(x => {
            this.notify.showError('Ошибка', x.message);
        })
    ), {dispatch: false})
}