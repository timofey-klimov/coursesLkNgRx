import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getUserAction } from "src/app/auth/store/actions/getUser.actions";

@Component({
    selector: 'teacherLayout',
    templateUrl: './teacherLayout.component.html',
    styleUrls: ['./teacherLayout.component.scss']
})
export class TeacherLayoutComponent {

    constructor(private router: Router, private store: Store) {

    }

    manageTests(): void {
        this.router.navigate(['/teacher', 'manage-tests'])
    }

    manageGroups(): void {
        this.router.navigate(['/teacher', 'manage-groups'])
    }
    sendEmail(): void{
        this.router.navigate(['/teacher', 'send-email'])
    }

    logout(): void {
        localStorage.removeItem('token');
        this.store.dispatch(getUserAction());
    }
}