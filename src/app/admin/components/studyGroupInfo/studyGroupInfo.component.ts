import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { getStudyGroupInfoAction } from "../../store/action/getStudyGroupInfo.action";
import { isLoadingStudyGroupInfoSelector, studyGroupInfoSelector, wasErrorStudyGroupInfoSelector } from "../../store/selector";
import { IGetStudyGroupInfoRequest } from "../../types/getStudyGroupInfo.request";
import { IGetStudyGroupInfoResponse } from "../../types/getStudyGroupInfo.response";

@Component({
    selector: 'studyGroupInfo',
    templateUrl: './studyGroupInfo.component.html',
    styleUrls: ['./studyGroupInfo.component.scss']
})
export class StudyGroupInfoComponent implements OnInit,OnDestroy {

    groupInfo$: Observable<IGetStudyGroupInfoResponse | null>;
    isLoading$: Observable<boolean>;
    subscription: Subscription;
    displayedColumns: string[];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {groupId: number, teacherId: number}, 
        private store: Store,
        private matDialogRef: MatDialogRef<StudyGroupInfoComponent>){
        
    }
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.displayedColumns = ['name','surname','login','actions'];
        this.isLoading$ = this.store.select(isLoadingStudyGroupInfoSelector);
        this.groupInfo$ = this.store.select(studyGroupInfoSelector)
        this.subscription = this.store.select(wasErrorStudyGroupInfoSelector).subscribe((error: boolean) => {
            if(error) {
                this.matDialogRef.close();
            }
        })


        const request: IGetStudyGroupInfoRequest = {
            groupId: this.data.groupId,
            teacherId: this.data.teacherId
        }
        this.store.dispatch(getStudyGroupInfoAction({request}))
    }
}
