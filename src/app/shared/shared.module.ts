import { NgModule } from "@angular/core";
import { TableTitleComponent } from "./components/table-title/table-title.component";
import {MatDividerModule} from '@angular/material/divider';
import { ModalTitleComponent } from "./components/modal-title/modal-title.component";

@NgModule({
    declarations: [
        TableTitleComponent,
        ModalTitleComponent
    ],
    exports: [
        TableTitleComponent,
        ModalTitleComponent
    ],
    imports: [MatDividerModule]
})
export class SharedModule {

}