import { NgModule } from "@angular/core";
import { TableTitleComponent } from "./components/table-title/table-title.component";
import {MatDividerModule} from '@angular/material/divider';
import { ModalTitleComponent } from "./components/modal-title/modal-title.component";
import { IconDirective } from "./directives/icon.directive";
import { FormStateMatcher } from "./services/matcher.service";

@NgModule({
    declarations: [
        TableTitleComponent,
        ModalTitleComponent,
        IconDirective,
    ],
    exports: [
        TableTitleComponent,
        ModalTitleComponent,
        IconDirective,
    ],
    imports: [MatDividerModule]
})
export class SharedModule {

}