import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getTestsAction } from "../../store/actions/getTests.actions";
import { createdTestsSelector, isLoadingSelector } from "../../store/selector";
import { IGetTeacherTestsResponse } from "../../types/getTests.response";

@Component({
    selector: 'manageTests',
    templateUrl: './manageTests.component.html',
    styleUrls: ['./manageTests.component.scss']
})
export class ManageTestsComponent implements OnInit{

    isLoading$: Observable<boolean>;
    createdTests$: Observable<IGetTeacherTestsResponse>;
    displayedColumns: string[];

    constructor(private store: Store, private router: Router) {

    }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.createdTests$ = this.store.select(createdTestsSelector);
        this.displayedColumns = ['title','createDate']
        this.store.dispatch(getTestsAction({request: {limit:10, offset:0}}))
    }

    createTest(): void {
        this.router.navigate(['/teacher', 'create-test'])
    }
}