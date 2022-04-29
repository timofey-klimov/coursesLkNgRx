import { Location } from "@angular/common";
import { Component } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { IGetTeacherTestsRequest } from "src/app/teacher/teacher-tests/types/getTests.request";
import { IGetTeacherTestsResponse } from "src/app/teacher/teacher-tests/types/getTests.response";
import { getTestsAction } from "../../store/actions/getTeacherTests.action";
import { createdTestsSelector, isLoadingSelector } from "../../store/selector";

@Component({
    selector: 'teacherTests',
    templateUrl: './teacherTests.component.html',
    styleUrls: ['./teacherTests.component.scss']
})
export class TeacherTestsComponent {
    isLoading$: Observable<boolean>;
    createdTests$: Observable<IGetTeacherTestsResponse>;
    displayedColumns: string[];

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.createdTests$ = this.store.select(createdTestsSelector);
        this.displayedColumns = ['title','createDate']
        this._initForm(5, 0);
    }

    changePage(pageEvent: PageEvent): void {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        this._initForm(limit, offset);
    }

    private _initForm(limit: number, offset: number) {
        const request: IGetTeacherTestsRequest = {limit, offset};
        this.store.dispatch(getTestsAction({request}));
    }
}