import {Component, OnInit} from '@angular/core';
import {ProjectsQuery} from '../../../../state/projects/projects.query';

@Component({
    selector: 'tsm-project-header',
    templateUrl: './project-header.component.html',
    styleUrls: ['./project-header.component.less']
})
export class ProjectHeaderComponent implements OnInit {

    _project$ = this.projectsQuery.select(state => state.selected);

    _loading$ = this.projectsQuery.selectLoading();

    constructor(private projectsQuery: ProjectsQuery) {
    }

    ngOnInit(): void {
    }

}
