import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'groupInfo',
    templateUrl: './groupInfo.component.html',
    styleUrls: ['./groupInfo.component.scss']
})
export class GroupInfoComponent {
   
    constructor(@Inject(MAT_DIALOG_DATA) private data: number) {
        
    }

    
}