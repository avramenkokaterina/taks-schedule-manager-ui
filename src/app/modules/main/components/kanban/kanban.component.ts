import {Component, OnInit} from '@angular/core';
import {TaskStatus} from '../../../../models/entity.model';
import {TasksQuery} from '../../../../state/tasks/tasks.query';
import {TasksService} from '../../../../state/tasks/tasks.service';
import {ProjectsQuery} from '../../../../state/projects/projects.query';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'tsm-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.less']
})
export class KanbanComponent implements OnInit {

    _tasks$ = this.tasksQuery.selectAll();

    _errorMessage = 'No tasks in sprint';

    _statuses: TaskStatus[] = Object.values(TaskStatus);

    _isError = false;

    constructor(private tasksQuery: TasksQuery,
                private tasksService: TasksService,
                private projectsQuery: ProjectsQuery,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        const sprintId = parseInt(this.route.snapshot.queryParamMap.get('sprintId'), 10);
        if (sprintId) {
            this.tasksService.fetchBySprintId(sprintId);
        } else {
            const project = this.projectsQuery.selected;
            if (project) {
                if (project.activeSprintId) {
                    this.tasksService.fetchBySprintId(project.activeSprintId);
                    this.router.navigate([], {
                        queryParams: {
                            sprintId: project.activeSprintId
                        },
                        relativeTo: this.route,
                        queryParamsHandling: 'merge',
                        replaceUrl: true
                    });
                } else {
                    this._errorMessage = 'No active sprint in project';
                    this._isError = true;
                }

            } else {
                this._errorMessage = 'No selected project';
                this._isError = true;
            }
        }
    }

}
