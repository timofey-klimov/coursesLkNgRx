import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { getUserAction } from "src/app/auth/store/actions/getUser.actions";
import { userAvatarSelector, userSelector } from "src/app/auth/store/selector";
import { ICurrentUser } from "src/app/shared/types/currentUser.interface";

@Component({
    selector: 'teacherLayout',
    templateUrl: './teacherLayout.component.html',
    styleUrls: ['./teacherLayout.component.scss']
})
export class TeacherLayoutComponent implements OnInit{

    public isMenuOpen: boolean = false;
    public currentUser$: Observable<ICurrentUser>;
    public imageUrl: SafeUrl;

    constructor(private store: Store, private sanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
        this.store.select(userAvatarSelector)
            .subscribe(blob => {
                if(!blob) {
                    return;
                }
                let objectUrl = URL.createObjectURL(blob);
                this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
            })
        this.currentUser$ = this.store.select(userSelector)
        
    }

    logout(): void {
        localStorage.removeItem('token');
        this.store.dispatch(getUserAction());
    }

    loadImage() {
    }
}