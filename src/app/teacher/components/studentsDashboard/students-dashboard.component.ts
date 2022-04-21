import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IStudent } from "src/app/shared/types/student.interface";
import { getManagedStudentsAction } from "../../store/actions/getManagedStudents.action";
import { isLoadingSelector, managedStudentsSelector } from "../../store/selector";
import { IGetManagedStudentsRequest } from "../../types/getManagedStudents.request";
import { IGetManagedStudentsResponse } from "../../types/getManagedStudents.response";
import { StudentInfoComponent } from "./studentInfo/studentInfo.component";

@Component({
    selector: 'manageStudents',
    templateUrl: './students-dashboard.component.html',
    styleUrls: ['./students-dashboard.component.scss']
})
export class StudentsDashboardComponent implements OnInit {

    students$: Observable<IGetManagedStudentsResponse>;
    displayColumns:string[];
    isLoading$: Observable<boolean>;

    constructor(private store: Store, private dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.students$ = this.store.select(managedStudentsSelector);
        this.displayColumns = ['name', 'surname', 'login'];
        this._initForm(0, 10);
    }


    changePage(pageEvent: PageEvent): void {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        this._initForm(offset, limit);
    }

    openStudentInfo(student: IStudent): void {
        this.dialog.open(StudentInfoComponent, {
            width: '60vw',
            height: '70vh',
            data: student
        })
    }

    private _initForm(offset: number, limit: number) {
        const request: IGetManagedStudentsRequest = {offset, limit};
        this.store.dispatch(getManagedStudentsAction({request}));
    }
}