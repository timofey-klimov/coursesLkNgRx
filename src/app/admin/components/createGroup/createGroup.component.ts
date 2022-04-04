import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IStudent } from "src/app/shared/types/student.interface";
import { getAllStudentsAction } from "../../store/action/getAllStudents.action";
import { getTeachersAction } from "../../store/action/getTeachers.actions";
import { allStudentsSelector, availabledTeachersSelector } from "../../store/selector";
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
    teachers: Observable<IGetTeachersResponse>;
    students: Observable<IStudent[]>;
    displayedTeachersColumns: string[];
    displayedStudentsColumns: string[];
    teachersIsLoading: boolean;
    studentsIsLoading: boolean;

    constructor(private store: Store){
    }

    ngOnInit(): void {
       this._initializeVariables();
        
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
            this.store.dispatch(getAllStudentsAction());
            this.studentsIsLoading = true;
        }
    }
    private _initializeVariables(): void {
        this.teachers = this.store.select(availabledTeachersSelector);
        this.students = this.store.select(allStudentsSelector);
        this.displayedTeachersColumns = ['name', 'surname', 'login'];
        this.displayedStudentsColumns = ['select', 'name', 'surname', 'login']
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
        this.teachersIsLoading = false;
    }

    changePage(pageEvent: PageEvent): void {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        this._initialTeachersForm(limit, offset);
    }

    private _initialTeachersForm(limit, offset): void {
        const request: IGetTeachersRequest = {
            limit: limit,
            offset: offset,
            filter: this.filterTeacherForm.value}
        this.store.dispatch(getTeachersAction({request}));
    }


}