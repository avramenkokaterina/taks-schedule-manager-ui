import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KanbanRoutingModule} from './kanban-routing.module';
import {KanbanComponent} from './kanban.component';
import {TaskCardComponent} from './task-card/task-card.component';
import {TaskColumnComponent} from './task-column/task-column.component';
import {MatButtonModule} from '@angular/material/button';
import {SprintEditComponent} from './sprint-edit/sprint-edit.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ParametersPanelModule} from '../../../../components/parameters-panel/parameters-panel.module';
import {TableModule} from '../../../../components/table/table.module';
import {TaskEditModule} from '../../../task-edit/task-edit.module';
import {SprintWidgetsModule} from '../../../sprint-widgets/sprint-widgets.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectHeaderModule} from '../project-header/project-header.module';


@NgModule({
    declarations: [
        KanbanComponent,
        TaskCardComponent,
        TaskColumnComponent,
        SprintEditComponent
    ],
    imports: [
        CommonModule,
        KanbanRoutingModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        ParametersPanelModule,
        TableModule,
        TaskEditModule,
        SprintWidgetsModule,
        MatProgressSpinnerModule,
        ProjectHeaderModule
    ]
})
export class KanbanModule {
}
