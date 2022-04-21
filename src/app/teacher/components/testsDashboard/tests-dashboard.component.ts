import { Component, OnInit } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getTestsAction } from "../../store/actions/getTests.actions";
import { createdTestsSelector, isLoadingSelector } from "../../store/selector";
import { IGetTeacherTestsRequest } from "../../types/getTests.request";
import { IGetTeacherTestsResponse } from "../../types/getTests.response";

@Component({
    selector: 'manageTests',
    templateUrl: './tests-dashboard.component.html',
    styleUrls: ['./tests-dashboard.component.scss']
})
export class TestsDashboardComponent implements OnInit{

    isLoading$: Observable<boolean>;
    createdTests$: Observable<IGetTeacherTestsResponse>;
    displayedColumns: string[];

    constructor(private store: Store, private router: Router) {

    }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.createdTests$ = this.store.select(createdTestsSelector);
        this.displayedColumns = ['title','createDate']
        this._initForm(5, 0);
    }

    createTest(): void {
        this.router.navigate(['/teacher', 'create-test'])
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