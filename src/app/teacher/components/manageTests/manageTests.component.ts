import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
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
    displayColumns: string[];

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.createdTests$ = this.store.select(createdTestsSelector);
    }
}