import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectTeamRoutingModule } from './project-team-routing.module';
import { ProjectTeamComponent } from './project-team.component';


@NgModule({
  declarations: [ProjectTeamComponent],
  imports: [
    CommonModule,
    ProjectTeamRoutingModule
  ]
})
export class ProjectTeamModule { }
