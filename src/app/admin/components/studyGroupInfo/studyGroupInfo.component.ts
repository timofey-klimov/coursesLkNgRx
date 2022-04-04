import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'studyGroupInfo',
    templateUrl: './studyGroupInfo.component.html',
    styleUrls: ['./studyGroupInfo.component.scss']
})
export class StudyGroupInfoComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data: {groupId: number, teacherId: number}){
        
    }
}