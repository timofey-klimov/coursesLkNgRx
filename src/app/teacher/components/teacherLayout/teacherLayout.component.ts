import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getUserAction } from "src/app/auth/store/actions/getUser.actions";
import { userSelector } from "src/app/auth/store/selector";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";

@Component({
    selector: 'teacherLayout',
    templateUrl: './teacherLayout.component.html',
    styleUrls: ['./teacherLayout.component.scss']
})
export class TeacherLayoutComponent implements OnInit{

    public isMenuOpen: boolean = false;
    public currentUser$: Observable<ICurrentUser>;

    constructor(private store: Store) {

    }

    ngOnInit(): void {
        this.currentUser$ = this.store.select(userSelector)
    }

    logout(): void {
        localStorage.removeItem('token');
        this.store.dispatch(getUserAction());
    }
}