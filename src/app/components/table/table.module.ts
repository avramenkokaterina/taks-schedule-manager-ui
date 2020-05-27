import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';



@NgModule({
    declarations: [TableComponent],
    exports: [
        TableComponent
    ],
    imports: [
        CommonModule,
        MatCheckboxModule
    ]
})
export class TableModule { }
