import {Component, OnDestroy, OnInit} from '@angular/core';
import {Sprint, TaskStatus} from '../../../../models/entity.model';
import {TasksQuery} from '../../../../state/tasks/tasks.query';
import {TasksService} from '../../../../state/tasks/tasks.service';
import {ProjectsQuery} from '../../../../state/projects/projects.query';
import {ActivatedRoute, Router} from '@angular/router';
import {SprintsService} from '../../../../state/sprints/sprints.service';
import {SprintsQuery} from '../../../../state/sprints/sprints.query';
import {Observable, Subject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {SprintEditComponent} from './sprint-edit/sprint-edit.component';
import {HttpService} from '../../../../services/http/http.service';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tsm-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.less']
})
export class KanbanComponent implements OnInit, OnDestroy {

    _tasks$ = this.tasksQuery.selectAll();

    _errorMessage = 'No tasks in sprint';

    _statuses: TaskStatus[] = Object.values(TaskStatus);

    _isError = false;

    _activeSprint$: Observable<Sprint> = this.sprintsQuery.selectActive();

    private sprintId: number;

    private destroyStream$ = new Subject();

    constructor(private tasksQuery: TasksQuery,
                private tasksService: TasksService,
                private projectsQuery: ProjectsQuery,
                private route: ActivatedRoute,
                private router: Router,
                private sprintsService: SprintsService,
                private sprintsQuery: SprintsQuery,
                private matDialog: MatDialog,
                private http: HttpService) {
    }

    ngOnInit(): void {
        const sprintId = parseInt(this.route.snapshot.queryParamMap.get('sprintId'), 10);
        if (sprintId) {
            this.sprintId = sprintId;
            this.tasksService.fetchBySprintId(sprintId);
            this.sprintsService.fetchActiveById(sprintId);
        } else {
            const project = this.projectsQuery.selected;
            if (project) {
                if (project.activeSprintId) {
                    this.sprintId = project.activeSprintId;
                    this.tasksService.fetchBySprintId(project.activeSprintId);
                    this.sprintsService.fetchActiveById(project.activeSprintId);
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

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    _reload(): void {
        this.tasksService.fetchBySprintId(this.sprintId);
    }

    _editSprint(): void {
        this.matDialog.open(SprintEditComponent, {
            data: {
                sprint: this.sprintsQuery.getActive(),
                onSave: (sprint: Sprint, selectedSet: Set<number>) => {
                    this.sprintsService.edit({
                        ...sprint,
                        tasks: selectedSet && Array.from(selectedSet) || []
                    }).subscribe(() => {
                        this._reload();
                    });
                }
            }
        });
    }

    _startSprint(): void {
        this.http.createSprintSchedule({sprintId: this.sprintId})
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(() => {
                this.sprintsService.fetchActiveById(this.sprintId)
            });
    }

}
