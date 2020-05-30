import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TaskEditComponent} from './task-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
    declarations: [TaskEditComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatSelectModule
    ],
    exports: [TaskEditComponent]
})
export class TaskEditModule {
}
