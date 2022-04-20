import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IGetStudentsRequest } from "src/app/admin/types/getStudents.request";
import { getManagedStudentsAction } from "../../store/actions/getManagedStudents.action";
import { isLoadingSelector, managedStudentsSelector } from "../../store/selector";
import { IGetManagedStudentsRequest } from "../../types/getManagedStudents.request";
import { IGetManagedStudentsResponse } from "../../types/getManagedStudents.response";

@Component({
    selector: 'manageStudents',
    templateUrl: './manageStudents.component.html',
    styleUrls: ['./manageStudents.component.scss']
})
export class ManageStudentsComponent implements OnInit {

    students$: Observable<IGetManagedStudentsResponse>;
    displayColumns:string[];
    isLoading$: Observable<boolean>;

    constructor(private store: Store) {

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

    private _initForm(offset: number, limit: number) {
        const request: IGetManagedStudentsRequest = {offset, limit};
        this.store.dispatch(getManagedStudentsAction({request}));
    }
}