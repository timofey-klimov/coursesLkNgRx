import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
    imports:[
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule,
        MatExpansionModule,
        ScrollingModule,
        MatSnackBarModule,
        MatStepperModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatIconModule,
        MatSidenavModule
    ],
    exports:[
        MatButtonModule,
        MatDividerModule,
        MatDialogModule,
        MatInputModule,
        MatCheckboxModule,
        MatMenuModule,
        MatExpansionModule,
        ScrollingModule,
        MatSnackBarModule,
        MatStepperModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatIconModule,
        MatSidenavModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' }
    ]
})
export class MaterialModule {
}