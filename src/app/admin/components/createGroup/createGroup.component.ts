import { StepperSelectionEvent } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ITeacher } from "src/app/shared/types/teacher.interface";
import { getTeachersAction } from "../../store/action/getTeachers.actions";
import { availabledTeachersSelector } from "../../store/selector";
import { IGetTeachersRequest } from "../../types/getTeachers.request";

@Component({
    selector: 'createGroup',
    templateUrl: './createGroup.component.html',
    styleUrls: ['./createGroup.component.scss']
})
export class CreateGroupComponent implements OnInit {
    groupTitleForm: FormGroup;
    filterTeacherForm: FormGroup;
    selectedTeacherForm: FormGroup;
    teachers: Observable<ITeacher[]>;
    displayedColumns: string[];
    dataIsLoading: boolean;

    constructor(private store: Store){
    }

    ngOnInit(): void {
       this._initializeVariables();
        
    }
    
    applyFilter() {
        this._initialForm();
    }

    selectTeacher(value: any){
        const previousValue = this.selectedTeacherForm.get('id').value;

        const currentValue = previousValue === value.id ? null : value.id;

        this.selectedTeacherForm.setValue({id: currentValue})
    }

    stepChanged(event: StepperSelectionEvent): void {
        if (!this.dataIsLoading && event.selectedIndex === 1) {
            this._initialForm();
        } 
    }
    private _initializeVariables(): void {
        this.teachers = this.store.select(availabledTeachersSelector);
        this.displayedColumns = ['name', 'surname', 'login'];
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
        this.dataIsLoading = false;
    }

    private _initialForm(): void {
        const request: IGetTeachersRequest = this.filterTeacherForm.value;
        this.store.dispatch(getTeachersAction({request}));
    }


}