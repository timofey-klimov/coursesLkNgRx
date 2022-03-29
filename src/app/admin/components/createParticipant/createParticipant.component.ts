import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { NotificationService } from "src/app/shared/services/notification.service";
import { createParticipantAction } from "../../store/action/createParticipant.actions";
import { ICreateParticipant } from "../../types/createParticipant.request";

@Component({
    selector: 'createParticipant',
    templateUrl: './createParticipant.component.html',
    styleUrls: ['./createParticipant.component.scss']
})
export class CreateParticipantComponent implements OnInit {

    form: FormGroup;
    constructor(private store: Store, private matDialogRef: MatDialogRef<CreateParticipantComponent>, private notify: NotificationService) {

    }

    ngOnInit(): void {
        this.form = new FormGroup({
            name: new FormControl('', Validators.required),
            surname: new FormControl('', Validators.required),
            login: new FormControl('', [Validators.required,Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            role: new FormControl('', [Validators.required])
        })
    }

    onSubmit(): void {
        const request: ICreateParticipant = this.form.value;
        this.notify.withWarningWindow('Подтвердите создание учетной записи', () => {
            this.store.dispatch(createParticipantAction({request}));
            this.matDialogRef.close();
        })
    }
}   