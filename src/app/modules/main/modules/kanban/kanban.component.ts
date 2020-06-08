import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Project, Sprint, Task, TaskStatus} from '../../../../models/entity.model';
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
import {filter, takeUntil} from 'rxjs/operators';
import {TaskEditComponent} from '../../../task-edit/task-edit.component';
import {nullDelete} from '../../../../utils/null-delete';
import {ProjectsService} from '../../../../state/projects/projects.service';

@Component({
    selector: 'tsm-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.less']
})
export class KanbanComponent implements OnInit, OnDestroy {

    _tasks$ = this.tasksQuery.selectAll();

    _statuses: TaskStatus[] = Object.values(TaskStatus);

    _activeSprint$: Observable<Sprint> = this.sprintsQuery.selectActive();

    _sprintId: number;

    _tasksLoading$ = this.tasksQuery.selectLoading();

    _sprintLoading$ = this.tasksQuery.selectLoading();

    _projectId: number;

    private destroyStream$ = new Subject();

    constructor(private tasksQuery: TasksQuery,
                private tasksService: TasksService,
                private projectsQuery: ProjectsQuery,
                private route: ActivatedRoute,
                private router: Router,
                private sprintsService: SprintsService,
                private sprintsQuery: SprintsQuery,
                private matDialog: MatDialog,
                private http: HttpService,
                private projectsService: ProjectsService,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        const sprintId = parseInt(this.route.snapshot.queryParamMap.get('sprintId'), 10);
        const projectId = parseInt(this.route.snapshot.queryParamMap.get('projectId'), 10);
        if (projectId) {
            this._projectId = projectId;
        }
        if (sprintId) {
            this._sprintId = sprintId;
            this.tasksService.fetchBySprintId(sprintId);
        }
        this.sprintsQuery.selectActive()
            .pipe(
                filter(sprint => !!sprint),
                takeUntil(this.destroyStream$)
            )
            .subscribe((sprint) => {
                this._sprintId = sprint.id;
                this.tasksService.fetchBySprintId(sprint.id);
            });

        this.projectsQuery.select((state) => state.selected)
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe((project: Project) => {
                this._projectId = project && project.id;
            });
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    _reload(): void {
        this.tasksService.fetchBySprintId(this._sprintId);
    }

    _endSprint(): void {
        this.http.endSprint({sprintId: this._sprintId})
            .subscribe(() => {
                this._sprintId = null;
                this.sprintsService.resetActive();
                this.cdr.markForCheck();
            })
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
                        this.cdr.markForCheck();
                    });
                }
            }
        });
    }

    _startSprint(): void {
        this.http.createSprintSchedule({sprintId: this._sprintId})
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(() => {
                this.sprintsService.fetchActiveById(this._sprintId);
                this._reload();
                this.cdr.markForCheck();
            });
    }

    _createSprint() {
        this.matDialog.open(SprintEditComponent, {
            data: {
                projectId: this.projectsQuery.selected.id,
                onSave: (sprint: Sprint, selectedSet: Set<number>) => {
                    this.sprintsService.create({
                        ...sprint,
                        tasks: selectedSet && Array.from(selectedSet) || [],
                        projectId: this.projectsQuery.selected.id
                    }).subscribe((response) => {
                        this.load(response.sprint.id);
                        this.projectsService.update({id: this.projectsQuery.selected.id, activeSprintId: response.sprint.id})
                            .subscribe();
                        this.cdr.markForCheck();
                    });
                }
            }
        });
    }

    _editTask(task: Task) {
        this.matDialog.open(TaskEditComponent, {
            data: {
                task: task,
                onSubmit: (task: Task) => {
                    this.http.editTask(nullDelete(task))
                        .pipe(
                            takeUntil(this.destroyStream$)
                        )
                        .subscribe(() => {
                            this.tasksService.fetchBySprintId(this._sprintId);
                        });
                }
            }
        });
    }

    private load(sprintId: number) {
        this._sprintId = sprintId;
        this.tasksService.fetchBySprintId(sprintId);
        this.sprintsService.fetchActiveById(sprintId);
    }

}
