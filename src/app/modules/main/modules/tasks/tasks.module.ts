import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import {TableModule} from '../../../../components/table/table.module';
import {MatButtonModule} from '@angular/material/button';
import {TaskEditModule} from '../../../task-edit/task-edit.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectHeaderModule} from '../project-header/project-header.module';


@NgModule({
  declarations: [TasksComponent],
    imports: [
        CommonModule,
        TasksRoutingModule,
        TableModule,
        MatButtonModule,
        TaskEditModule,
        MatProgressSpinnerModule,
        ProjectHeaderModule
    ]
})
export class TasksModule { }
