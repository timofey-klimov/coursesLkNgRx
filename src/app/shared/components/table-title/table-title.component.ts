import { Component, Input } from "@angular/core";

@Component({
    selector: 'table-title',
    templateUrl: './table-title.component.html',
    styleUrls: ['./table-title.component.scss']
})
export class TableTitleComponent {
    @Input('title') title;
    
}