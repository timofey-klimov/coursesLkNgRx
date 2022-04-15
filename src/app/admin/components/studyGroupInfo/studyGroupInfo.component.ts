import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { MatCheckbox, MatCheckboxChange } from "@angular/material/checkbox";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { IStudent } from "src/app/shared/types/student.interface";
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
    displayedColumnsForInfo: string[];
    displayedColumnsForEditing: string[];
    templateState: boolean;
    students: IStudent[];
    
    @ViewChildren('checkBox') checkBoxes: MatCheckbox[];
    @ViewChild('table') matTable: MatTable<IStudent>;

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
        this.displayedColumnsForInfo = ['name','surname','login'];
        this.displayedColumnsForEditing = ['select','name','surname','login'];
        this.isLoading$ = this.store.select(isLoadingStudyGroupInfoSelector);
        this.groupInfo$ = this.store.select(studyGroupInfoSelector)
        this.templateState = true;
        this.students = [];
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
    changeTemplate(): void {
        this.templateState = !this.templateState;
    }
    masterCheckBoxChange(event: MatCheckboxChange): void {

        if (event.checked) {
            this.students = this.matTable.dataSource as IStudent[];
        } else {
            this.students = [];
        }

        this.checkBoxes.forEach(x => {
            if(x.checked != event.checked) {
                x.toggle();
            }
        });
    }

    checkBoxChange(event: MatCheckboxChange, row: IStudent): void {
        if (event.checked){
            this.students.push(row);
        }else {
            this.students = this.students.filter(student => {
                if(student.id != row.id) {
                    return student;
                }
            })    
        }
        
    }
}
