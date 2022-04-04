import { AfterContentChecked, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { debounceTime, delay } from "rxjs/operators";
import { isLoadingSelector } from "../../store/selector";

@Component({
    selector: 'admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

    constructor(private router: Router, private store: Store) {
       
    }

    onUserManage(): void {
        this.router.navigate(['/admin','manage-participants'])        
    }

    onGroupsManage(): void {
        this.router.navigate(['/admin', 'manage-groups'])
    }
}