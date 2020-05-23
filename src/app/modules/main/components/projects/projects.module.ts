import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectsRoutingModule} from './projects-routing.module';
import {TSMProjectsComponent} from './projects.component';
import {ProjectCardComponent} from './components/project-card/project-card.component';
import {ProjectEditComponent} from './components/project-edit/project-edit.component';
import {ParametersPanelModule} from '../../../../components/parameters-panel/parameters-panel.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        TSMProjectsComponent,
        ProjectCardComponent,
        ProjectEditComponent
    ],
    imports: [
        CommonModule,
        ProjectsRoutingModule,
        ParametersPanelModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class ProjectsModule {
}
