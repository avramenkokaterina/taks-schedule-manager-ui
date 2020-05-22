import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../../../../state/projects/projects.service';
import {ProjectsQuery} from '../../../../state/projects/projects.query';
import {MatDialog} from '@angular/material/dialog';
import {ProjectEditComponent} from './components/project-edit/project-edit.component';

@Component({
    selector: 'tsm-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.less']
})
export class TSMProjectsComponent implements OnInit {

    _projects$ = this.query.selectAll();

    constructor(private service: ProjectsService,
                private query: ProjectsQuery,
                private matDialog: MatDialog) {
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

}
