import { SelectionModel } from "@angular/cdk/collections";
import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { NotificationService } from "src/app/shared/services/notification.service";
import { IStudent } from "src/app/shared/types/student.interface";
import { createGroupAction } from "../../store/action/createGroup.action";
import { getAllStudentsAction } from "../../store/action/getAllStudents.action";
import { getTeachersAction } from "../../store/action/getTeachers.actions";
import { allStudentsSelector, availabledTeachersSelector } from "../../store/selector";
import { ICreateGroupRequest } from "../../types/createGroup.request";
import { IGetStudentsRequest } from "../../types/getStudents.request";
import { IGetStudentsResponse } from "../../types/getStudents.response";
import { IGetTeachersRequest } from "../../types/getTeachers.request";
import { IGetTeachersResponse } from "../../types/getTeachers.response";

@Component({
    selector: 'createGroup',
    templateUrl: './createGroup.component.html',
    styleUrls: ['./createGroup.component.scss']
})
export class CreateGroupComponent implements OnInit {
    groupTitleForm: FormGroup;
    filterTeacherForm: FormGroup;
    selectedTeacherForm: FormGroup;
    selectStudentsForm: FormGroup;
    teachers: Observable<IGetTeachersResponse>;
    students: Observable<IGetStudentsResponse>;
    displayedTeachersColumns: string[];
    displayedStudentsColumns: string[];
    teachersIsLoading: boolean;
    studentsIsLoading: boolean;

    constructor(private store: Store, private notify: NotificationService, private ref: MatDialogRef<CreateGroupComponent>) {
    }

    ngOnInit(): void {
       this._initializeVariables();
        
    }

    createGroup(): void {
        this.notify.withWarningWindow('Подтвердите создание группы', () => {
            const { title } = this.groupTitleForm.value;
            const { id } = this.selectedTeacherForm.value;
            const { students } = this.selectStudentsForm.value;

            const request: ICreateGroupRequest = {
                title,
                teacher: id,
                students
            }

            this.store.dispatch(createGroupAction({request}))
            this.ref.close();
        })
        
    }
    
    applyFilter() {
        this._initialTeachersForm(5,0);
    }

    selectTeacher(value: any){
        const previousValue = this.selectedTeacherForm.get('id').value;

        const currentValue = previousValue === value.id ? null : value.id;

        this.selectedTeacherForm.setValue({id: currentValue})
    }

    stepChanged(event: StepperSelectionEvent): void {
        if (!this.teachersIsLoading && event.selectedIndex === 1) {
            this._initialTeachersForm(5, 0);
            this.teachersIsLoading = true;
        } 
        if (!this.studentsIsLoading && event.selectedIndex === 2){
            const request:IGetStudentsRequest = {
                limit:5,
                offset:0
            }
            this.store.dispatch(getAllStudentsAction({request}));
            this.studentsIsLoading = true;
        }
    }

    updateSelectedStudents(id: number){
        let students = this.selectStudentsForm.get('students') as FormArray;
        let values = students.value as Array<number>;
        if (!values.find(x => x == id)) {
            students.push(new FormControl(id))
        } else {
            let index = values.indexOf(id);
            students.removeAt(index);
        }
    }

    chechStudentInSelectStudents(id: number): boolean {
        let students = this.selectStudentsForm.get('students') as FormArray;
        let values = students.value as Array<number>;

        return values.find(x => x === id) !== undefined;
    }

    private _initializeVariables(): void {
        this.teachers = this.store.select(availabledTeachersSelector);
        this.students = this.store.select(allStudentsSelector);
        this.displayedTeachersColumns = ['name', 'surname', 'login'];
        this.displayedStudentsColumns = ['select','name', 'surname', 'login']
        this.filterTeacherForm = new FormGroup({
            name: new FormControl(null),
            surname: new FormControl(null)
        })
        this.groupTitleForm = new FormGroup({
            title: new FormControl('',Validators.required)
        });
        this.selectedTeacherForm = new FormGroup({
            id: new FormControl(null, Validators.required)
        })
        this.selectStudentsForm = new FormGroup({
            students: new FormArray([], Validators.required)
        })

        this.teachersIsLoading = false;
        this.studentsIsLoading = false;
    }

    changeTeacherPage(pageEvent: PageEvent): void {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        this._initialTeachersForm(limit, offset);
    }

    changeStudentPage(pageEvent: PageEvent) {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        const request:IGetStudentsRequest = {
            limit,
            offset
        }
        this.store.dispatch(getAllStudentsAction({request}));
    }

    private _initialTeachersForm(limit, offset): void {
        const request: IGetTeachersRequest = {
            limit: limit,
            offset: offset,
            filter: this.filterTeacherForm.value}
        this.store.dispatch(getTeachersAction({request}));
    }


}