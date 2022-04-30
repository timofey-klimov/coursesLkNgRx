import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { IAssignTest } from "src/app/shared/types/assignTest.interface";
import { IStudent } from "src/app/shared/types/student.interface";
import { getStudentInfoAction } from "../../store/actions/getStudentInfo.action";
import { studentInfoLoadingSelector, studentInfoSelector, wasErrorInStudentInfoSelector } from "../../store/selector";
import { IGetStudentInfoResponse } from "../../types/getStudentInfo.response";

@Component({
    selector: 'studentInfo',
    templateUrl: './studentInfo.component.html',
    styleUrls: ['./studentInfo.component.scss']
})
export class StudentInfoComponent {
    studentInfo$: Observable<IGetStudentInfoResponse>;
    isLoading$: Observable<boolean>;
    subscription: Subscription;
    testsColumns: string[];

    constructor(
        @Inject(MAT_DIALOG_DATA) private student: IStudent, 
        private store: Store,
        private dialogRef: MatDialogRef<StudentInfoComponent>) {

    }
    
    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    ngOnInit(): void {
        this.testsColumns = ['title', 'createDate', 'deadline', 'status'];
        this.isLoading$ = this.store.select(studentInfoLoadingSelector);
        this.studentInfo$ = this.store.select(studentInfoSelector);
        this.store.dispatch(getStudentInfoAction({request: {studentId: this.student.id}}))
        this.subscription = this.store.select(wasErrorInStudentInfoSelector)
            .subscribe(error => {
                if (error) {
                    this.dialogRef.close();
                }
        })
    }
    
    getStatus(assigedtest: IAssignTest): string {
        if (assigedtest.overDue) {
            return 'Просрочено'
        }

        if (assigedtest.overDueSoon) {
            return 'Скоро сдавать'
        }

        return 'Назначено';
    }

}