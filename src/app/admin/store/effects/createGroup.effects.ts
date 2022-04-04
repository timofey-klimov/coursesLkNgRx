import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { GroupsApiService } from "../../services/groupsApi.service";
import { createGroupAction, createGroupFailedAction, createGroupSuccessAction } from "../action/createGroup.action";

@Injectable()
export class CreateGroupEffect {

    constructor(private actions: Actions, private groupApi: GroupsApiService, private notify: NotificationService) {

    }

    createGroupEffect$ = createEffect(() => this.actions.pipe(
        ofType(createGroupAction),
        switchMap(x => {
            return this.groupApi.createGroup(x.request)
                .pipe(
                    map(x => createGroupSuccessAction({group: x.data})),
                    catchError((err: HttpErrorResponse) => of(createGroupFailedAction({message: 'Неизвестная ошибка'})))
                )
        })
    ))

    createGroupSuccess$ = createEffect(() => this.actions.pipe(
        ofType(createGroupSuccessAction),
        tap(x => this.notify.showSuccess('Успешно','Группа создана'))
    ), {dispatch: false})
}