import {Component, OnDestroy, OnInit} from '@angular/core';
import {RouterTabItem} from '../../components/router-tabs/router-tabs.types';
import {ProjectsService} from '../../state/projects/projects.service';
import {SprintsService} from '../../state/sprints/sprints.service';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsQuery} from '../../state/projects/projects.query';
import {SprintsQuery} from '../../state/sprints/sprints.query';
import {takeUntil} from 'rxjs/operators';
import {Project, Sprint} from '../../models/entity.model';

@Component({
    selector: 'tsm-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class TSMMainComponent implements OnInit, OnDestroy {

    _tabItems: RouterTabItem[] = [
        {
            id: 'projects',
            link: 'projects',
            iconName: 'squares'
        },
        {
            id: 'kanban',
            link: 'kanban',
            iconName: 'kanban'
        },
        {
            id: 'ganChart',
            link: 'gan-chart',
            iconName: 'calendar'
        },
        {
            id: 'projectTeam',
            link: 'project-team',
            iconName: 'people'
        },
        {
            id: 'statistic',
            link: 'statistic',
            iconName: 'statistic'
        },
        {
            id: 'tasks',
            link: 'tasks',
            iconName: 'list'
        }
    ];

    _tabBottomItems: RouterTabItem[] = [
        {
            id: 'logout',
            link: '/auth',
            iconName: 'circle'
        }
    ];

    private destroyStream$ = new Subject();

    constructor(private sprintsService: SprintsService,
                private route: ActivatedRoute,
                private router: Router,
                private projectsService: ProjectsService,
                private projectsQuery: ProjectsQuery,
                private sprintsQuery: SprintsQuery) {

    }

    ngOnInit() {
        const sprintId = this.route.snapshot.queryParamMap.get('sprintId');
        const projectId = this.route.snapshot.queryParamMap.get('projectId');
        sprintId && this.sprintsService.fetchActiveById(parseInt(sprintId, 10), (sprint: Sprint) => {
            if (!projectId) {
                this.projectsService.fetch(sprint.projectId);
            }
        });
        projectId && this.projectsService.fetch(parseInt(projectId, 10), (project: Project) => {
            if (!sprintId) {
                project && project.activeSprintId && this.sprintsService.fetchActiveById(project.activeSprintId);
            }
        });
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }
}
