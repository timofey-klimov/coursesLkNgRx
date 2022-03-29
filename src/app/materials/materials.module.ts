import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
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
        MatSelectModule
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
        MatSelectModule
    ]
})
export class MaterialModule {
}