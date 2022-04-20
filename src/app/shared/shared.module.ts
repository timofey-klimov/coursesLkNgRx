import { NgModule } from "@angular/core";
import { TableTitleComponent } from "./components/table-title/table-title.component";
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
    declarations: [TableTitleComponent],
    exports: [TableTitleComponent],
    imports: [MatDividerModule]
})
export class SharedModule {

}