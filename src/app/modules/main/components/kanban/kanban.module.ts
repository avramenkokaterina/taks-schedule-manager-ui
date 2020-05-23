import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanComponent } from './kanban.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskColumnComponent } from './task-column/task-column.component';


@NgModule({
  declarations: [KanbanComponent, TaskCardComponent, TaskColumnComponent],
  imports: [
    CommonModule,
    KanbanRoutingModule
  ]
})
export class KanbanModule { }
