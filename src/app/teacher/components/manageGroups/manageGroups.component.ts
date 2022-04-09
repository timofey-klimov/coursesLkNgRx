import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getGroupsAction } from "../../store/actions/getGroups.action";
import { groupsSelector, isLoadingSelector } from "../../store/selector";
import { IGetGroupsRequest } from "../../types/getGroups.request";
import { IGetGroupsResponse } from "../../types/getGroups.response";
import { GroupInfoComponent } from "../groupInfo/groupInfo.component";

@Component({
    selector: 'manageGroups',
    templateUrl: './manageGroups.component.html',
    styleUrls: ['./manageGroups.component.scss']
})
export class ManageGoupsComponent implements OnInit {

    groups$: Observable<IGetGroupsResponse>;
    isLoading$: Observable<boolean>;
    displayedColumns: string[];

    constructor(private store: Store, private matDialog: MatDialog) {

    }

    ngOnInit(): void {
        this.groups$ = this.store.select(groupsSelector);
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.displayedColumns = ['title','createDate', 'studentsCount'];
        this._initForm(0, 5);
    }

    changePage(pageEvent: PageEvent): void {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        this._initForm(offset, limit);
    }

    openGroupInfo(id: number): void {
        this.matDialog.open(GroupInfoComponent, {
            width: '40vw',
            height: '70vh',
            data: id
        })
    }

    private _initForm(offset: number, limit: number) {
        const request: IGetGroupsRequest = {offset, limit};
        this.store.dispatch(getGroupsAction({request}));
    }



}