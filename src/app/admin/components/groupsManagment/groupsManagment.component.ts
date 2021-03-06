import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getGroupsAction } from "../../store/action/manageGroups.action";
import { isLoadingSelector, managedGroupsSelector } from "../../store/selector";
import { IGetGroupsRequest } from "../../types/getGroups.request";
import { IGetGroupsResponse } from "../../types/getGroups.response";
import { CreateGroupComponent } from "../createGroup/createGroup.component";
import { StudyGroupInfoComponent } from "../studyGroupInfo/studyGroupInfo.component";

@Component({
    selector: 'groupsManagment',
    templateUrl: './groupsManagment.component.html',
    styleUrls: ['./groupsManagment.component.scss']
})
export class GroupsManagmentComponent implements OnInit {

    groups$: Observable<IGetGroupsResponse | null>;
    displayedColumns: string[];
    isLoading$: Observable<boolean>;
    templateState: boolean;

    constructor(private store: Store, private matDialog: MatDialog) {

    }

    ngOnInit(): void {
        this.groups$ = this.store.select(managedGroupsSelector);
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.displayedColumns = ['title', 'teacher', 'createDate']
        this._initForm(0, 5);
    }
    
    
    getTeacherFullName(name: string, surname: string): string {
        return `${name} ${surname}`;
    }

    createGroup(): void {
        this.matDialog.open(CreateGroupComponent, {
            width: '80vw',
            height: '80vh'
        })
        
    }

    openGroupInfo(groupId: number, teacherId: number) {
        this.matDialog.open(StudyGroupInfoComponent, {
            width: '45vw',
            height: '80vh',
            data: { groupId, teacherId }
        })
    }

    changePage(pageEvent: PageEvent): void {
        this._initForm(pageEvent.pageIndex, pageEvent.pageSize);
    }
    

    private _initForm(pageIndex: number, itemsPerPage: number) {
        const offset = pageIndex * itemsPerPage;
        const limit = itemsPerPage;

        const request: IGetGroupsRequest = {
            limit,
            offset,
            pageNumber: pageIndex,
            itemsPerPage
        }
        
        this.store.dispatch(getGroupsAction({request}));
    }
}