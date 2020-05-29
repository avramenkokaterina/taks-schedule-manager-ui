import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTeamRoutingModule } from './project-team-routing.module';
import { ProjectTeamComponent } from './project-team.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ProjectTeamComponent],
  imports: [
    CommonModule,
    ProjectTeamRoutingModule,
    MatButtonModule
  ]
})
export class ProjectTeamModule { }
