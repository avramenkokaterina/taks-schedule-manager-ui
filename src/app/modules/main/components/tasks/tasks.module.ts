import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import {TableModule} from '../../../../components/table/table.module';
import {MatButtonModule} from '@angular/material/button';
import {TaskEditModule} from '../../../task-edit/task-edit.module';


@NgModule({
  declarations: [TasksComponent],
    imports: [
        CommonModule,
        TasksRoutingModule,
        TableModule,
        MatButtonModule,
        TaskEditModule
    ]
})
export class TasksModule { }
