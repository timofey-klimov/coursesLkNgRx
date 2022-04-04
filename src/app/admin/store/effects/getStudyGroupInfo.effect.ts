import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, Optional } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { NotificationService } from "src/app/shared/services/notification.service";
import { StudyGroupInfoComponent } from "../../components/studyGroupInfo/studyGroupInfo.component";
import { GroupsApiService } from "../../services/groupsApi.service";
import { getStudyGroupInfoAction, getStudyGroupInfoFailedAction, getStudyGroupInfoSuccessAction } from "../action/getStudyGroupInfo.action";

@Injectable()
export class GetStudyGroupInfoEffect {

    constructor(private actions: Actions, 
        private api: GroupsApiService, 
        private notify: NotificationService) {

    }

    getGroupInfoEffect$ = createEffect(() => this.actions.pipe(
        ofType(getStudyGroupInfoAction),
        switchMap(x => {
            return this.api.getInfo(x.request)
                .pipe(
                    map(x => getStudyGroupInfoSuccessAction({groupInfo: x.data})),
                    catchError((err: HttpErrorResponse) => {
                        let message = 'Неизвестная ошибка'
                        if(err.status === 205) {
                            message = 'Группа не найдена'
                        }
                        return of(getStudyGroupInfoFailedAction({message}))
                    })
                )
        })
    ))

    getGroupInfoFailedEffect$ = createEffect(() => this.actions.pipe(
        ofType(getStudyGroupInfoFailedAction),
        tap(x => {
            this.notify.showError('Внимание', x.message)
        })
    ), { dispatch: false})
}