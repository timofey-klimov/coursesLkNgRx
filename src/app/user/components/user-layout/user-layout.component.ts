import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getUserAction } from "src/app/auth/store/actions/getUser.actions";
import { userSelector } from "src/app/auth/store/selector";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";

@Component({
    selector: 'user-selector',
    templateUrl: './user-layout.component.html',
    styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit{

    user$: Observable<ICurrentUser>;

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.user$ = this.store.select(userSelector);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.store.dispatch(getUserAction());
    }
}