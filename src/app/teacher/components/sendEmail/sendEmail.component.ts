import { Component, OnInit} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'sendEmail',
    templateUrl: './sendEmail.component.html',
    styleUrls: ['./sendEmail.component.scss']
})
export class SendEmailComponent implements OnInit {
    
    studentsColumns: string[];
    studentsForm: FormGroup;
    
    ngOnInit(): void {
        this.studentsColumns = ['name', 'surname','login'];
        this.studentsForm = new FormGroup({
            student: new FormControl('')
        })
    }
    
}