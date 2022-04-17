import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { getUserAction } from "src/app/auth/store/actions/getUser.actions";
import { isLoadingSelector, userSelector } from "src/app/auth/store/selector";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";

@Component({
    selector: 'admin-layout',
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

    user$: Observable<ICurrentUser>;
    isLoading$: Observable<boolean>;
    public isMenuOpen: boolean;
    constructor(private store: Store){
        
    }
   

    ngOnInit(): void {
        this.isLoading$ = this.store.select(isLoadingSelector);
        this.user$ = this.store.select(userSelector);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.store.dispatch(getUserAction());
    }
}