import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, ReplaySubject, Subscription } from "rxjs";
import { NotificationService } from "src/app/shared/services/notification.service";
import { blockParticipantAction } from "../../store/action/blockParticipant.action";
import { getParticipantsAction } from "../../store/action/manageUsers.actions";
import { unblockParticipantAction } from "../../store/action/unblockParticipant.action";
import { isLoadingSelector, managedUsersSelector } from "../../store/selector";
import { IGetUsersRequest } from "../../types/getUsers.request";
import { IGetUsersResponse } from "../../types/getUsers.response";
import { CreateParticipantComponent } from "../createParticipant/createParticipant.component";

@Component({
    selector: 'participant-managment',
    templateUrl: './participant-managment.component.html',
    styleUrls: ['./participant-managment.component.scss'],
})
export class ParticipantManagmentComponent implements OnInit {

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

        this.initialForm(0, 5);
    }

    changePage(pageEvent: PageEvent): void {
        this.initialForm(pageEvent.pageIndex, pageEvent.pageSize);
    }

    applyFilter() {
       this.initialForm(0,5);
    }

    clearForm(): void {
        this.form.reset();
        this.paginator._changePageSize(5);
        this.initialForm(0,5);
        
    }

    createUser(): void {
        this.matDialog.open(CreateParticipantComponent,{
            width: '30vw',
            height: '60vh'
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


    initialForm(currentPage: number, pageSize: number): void {
        const offset = currentPage * pageSize;
        const limit = pageSize;

        const request: IGetUsersRequest = {
            limit: limit,
            offset: offset,
            filter: this.form.value,
            currentPage,
            itemsPerPage: pageSize
        }
        this.store.dispatch(getParticipantsAction({request}))
    }
}