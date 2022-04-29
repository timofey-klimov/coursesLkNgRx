import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { IGetGroupInfoResponse } from "src/app/teacher/teacher-groups/types/getGroupInfo.response";
import { getGroupInfoAction } from "../../store/actions/getGroupInfo.action";
import { groupInfoSelector, groupInfoWasErrorSelector, isLoadingGroupInfoSelector } from "../../store/selector";

@Component({
    selector: 'group-info',
    templateUrl: './group-info.component.html',
    styleUrls: ['./group-info.component.scss']
})
export class GroupInfoComponent {

    subscription: Subscription;
    isLoading$: Observable<boolean>;
    groupInfo$: Observable<IGetGroupInfoResponse>;
    studentsColumns: string[];
    testsColumns: string[];

    constructor(
        @Inject(MAT_DIALOG_DATA) private data: number, 
        private store: Store,
        private ref: MatDialogRef<GroupInfoComponent>) {
        
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.studentsColumns = ['name', 'surname','login'];
        this.testsColumns = ['title','createDate','deadline'];
        this.subscription = this.store.select(groupInfoWasErrorSelector)
            .subscribe(error => {
                if (error) {
                    this.ref.close();
                }
            })
        this.isLoading$ = this.store.select(isLoadingGroupInfoSelector);
        this.groupInfo$ = this.store.select(groupInfoSelector);
        this.store.dispatch(getGroupInfoAction({request: {groupId: this.data}}))
    }
}