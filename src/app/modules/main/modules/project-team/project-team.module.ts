import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectTeamRoutingModule} from './project-team-routing.module';
import {ProjectTeamComponent} from './project-team.component';
import {MatButtonModule} from '@angular/material/button';
import {TeamSelectComponent} from './components/team-select/team-select.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProjectHeaderModule} from '../project-header/project-header.module';


@NgModule({
  declarations: [ProjectTeamComponent, TeamSelectComponent],
    imports: [
        CommonModule,
        ProjectTeamRoutingModule,
        MatButtonModule,
        MatDialogModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        ProjectHeaderModule
    ]
})
export class ProjectTeamModule { }
