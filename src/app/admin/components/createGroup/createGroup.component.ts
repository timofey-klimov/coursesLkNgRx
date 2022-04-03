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
    titleGroup: FormGroup;
    teacherForm: FormGroup;
    teachers: Observable<ITeacher[]>;
    displayedColumns: string[];
    constructor(private store: Store){

    }
    ngOnInit(): void {
        this.teachers = this.store.select(availabledTeachersSelector);
        this.titleGroup = new FormGroup({
            title: new FormControl('',Validators.required)
        });
        this.teacherForm = new FormGroup({
            name: new FormControl('',Validators.required),
            surname: new FormControl('', Validators.required)
        });
        this.displayedColumns = ['name', 'surname', 'login'];
        const request: IGetTeachersRequest = {name: null, surname: null}
        this.store.dispatch(getTeachersAction({request}))
    }
}