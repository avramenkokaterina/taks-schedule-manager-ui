import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../../../state/projects/projects.service';
import {ProjectsQuery} from '../../../../state/projects/projects.query';
import {MatDialog} from '@angular/material/dialog';
import {ProjectEditComponent} from './components/project-edit/project-edit.component';
import {Project} from '../../../../models/entity.model';
import {Router} from '@angular/router';
import {SprintsService} from '../../../../state/sprints/sprints.service';

@Component({
    selector: 'tsm-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.less']
})
export class TSMProjectsComponent implements OnInit {

    _projects$ = this.query.selectAll();

    _loading$ = this.query.selectLoading();

    constructor(private service: ProjectsService,
                private query: ProjectsQuery,
                private sprintsService: SprintsService,
                private matDialog: MatDialog,
                private router: Router) {
    }

    ngOnInit(): void {
        this.service.fetch();
    }

    _addProject(): void {
        this.matDialog.open(ProjectEditComponent, {
            data: {
                onSubmit: (project) => {
                    this.service.create(project);
                }
            }
        });
    }

    _selectProject(project: Project): void {
        this.service.setSelected(project.id);
        if (project.activeSprintId) {
            this.sprintsService.fetchActiveById(project.activeSprintId);
        } else {
            this.sprintsService.resetActive();
        }
        this.router.navigate(['main', 'kanban'], {
            queryParams: {
                projectId: project.id,
                sprintId: project.activeSprintId ?? undefined
            }
        });
    }

}
