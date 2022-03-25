import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from "rxjs";
import { NotificationService } from "src/app/shared/services/notification.service";
import { blockParticipantAction } from "../../store/action/blockParticipant.action";
import { getUsersAction } from "../../store/action/manageUsers.actions";
import { unblockParticipantAction } from "../../store/action/unblockParticipant.action";
import { isLoadingSelector, managedUsersSelector } from "../../store/selector";
import { IGetUsersRequest } from "../../types/getUsers.request";
import { IGetUsersResponse } from "../../types/getUsers.response";
import { CreateUserComponent } from "../createUser/createUser.component";

@Component({
    selector: 'user-managment',
    templateUrl: './user-managment.component.html',
    styleUrls: ['./user-managment.component.scss'],
})
export class UserManagmentComponent implements OnInit {

    managedUsers$: Observable<IGetUsersResponse>;
    displayedColumns: string[];
    form: FormGroup;
    isLoading$: Observable<boolean>;
    subsription: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private store: Store, private matDialog: MatDialog, private notify: NotificationService) {

    }
    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector)
        this.form = new FormGroup({
            name: new FormControl(null),
            surname: new FormControl(null),
            login: new FormControl(null),
            isOnlyActive: new FormControl(false)
        })
        this.displayedColumns = ['name', 'surname', 'login', 'actions']
        this.managedUsers$ = this.store.select(managedUsersSelector);

        this.initialForm(5, 0);
    }

    changePage(pageEvent: PageEvent): void {
        const offset = pageEvent.pageIndex * pageEvent.pageSize;
        const limit = pageEvent.pageSize;
        this.initialForm(limit, offset);
    }

    applyFilter() {
       this.initialForm(5, 0);
    }

    clearForm(): void {
        this.form.reset();
        this.paginator._changePageSize(5);
        this.initialForm(5, 0);
        
    }

    createUser(): void {
        this.matDialog.open(CreateUserComponent,{
            width: '20vw',
            height: '45vh'
        })
    }

    blockUser(id: number) {
        this.notify.withWarningWindow('Подтвердите блокировку учетной записи', () => {
            this.store.dispatch(blockParticipantAction({id}));
        })
    }

    unblock(id: number) {
        this.notify.withWarningWindow('Подтвердите разблокировку учетной записи', () => {
            this.store.dispatch(unblockParticipantAction({id}))
        })
    }


    initialForm(limit: number, offset:number): void {
        const request: IGetUsersRequest = {
            limit: limit,
            offset: offset,
            filter: this.form.value 
        }
        this.store.dispatch(getUsersAction({request}))
    }
}