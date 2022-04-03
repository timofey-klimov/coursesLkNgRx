import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { getTeachersAction } from "../../store/action/getTeachers.actions";
import { IGetTeachersRequest } from "../../types/getTeachers.request";

@Component({
    selector: 'createGroup',
    templateUrl: './createGroup.component.html',
    styleUrls: ['./createGroup.component.scss']
})
export class CreateGroupComponent implements OnInit {
    titleGroup: FormGroup;
    teacherForm: FormGroup;
    constructor(private store: Store){

    }
    ngOnInit(): void {
        this.titleGroup = new FormGroup({
            title: new FormControl('',Validators.required)
        });
        this.teacherForm = new FormGroup({
            name: new FormControl('',Validators.required),
            surname: new FormControl('', Validators.required)
        });
        const request: IGetTeachersRequest = {name: null, surname: null}
        this.store.dispatch(getTeachersAction({request}))
    }
}