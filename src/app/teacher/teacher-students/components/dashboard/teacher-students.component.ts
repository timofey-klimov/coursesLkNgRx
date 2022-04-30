import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IStudent } from "src/app/shared/types/student.interface";
import { IGetManagedStudentsRequest } from "src/app/teacher/teacher-students/types/getManagedStudents.request";
import { IGetManagedStudentsResponse } from "src/app/teacher/teacher-students/types/getManagedStudents.response";
import { getStudentsAction } from "../../store/actions/getStudents.action";
import { isLoadingSelector, studentsSelector } from "../../store/selector";
import { StudentInfoComponent } from "../studentInfo/studentInfo.component";

@Component({
    selector: 'teacher-students',
    templateUrl: './teacher-students.component.html',
    styleUrls: ['./teacher-students.component.scss']
})
export class TeacherStudentsComponent {
    students$: Observable<IGetManagedStudentsResponse>;
    displayColumns:string[];
    isLoading$: Observable<boolean>;

    constructor(private store: Store, private dialog: MatDialog) {

    }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.students$ = this.store.select(studentsSelector);
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
        this.store.dispatch(getStudentsAction({request}));
    }
}