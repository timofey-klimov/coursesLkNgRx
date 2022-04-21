import { Component, Input } from "@angular/core";

@Component({
    selector: 'modal-title',
    templateUrl: './modal-title.component.html',
    styleUrls: ['./modal-title.component.scss']
})
export class ModalTitleComponent {

    @Input('title') title: string;
}