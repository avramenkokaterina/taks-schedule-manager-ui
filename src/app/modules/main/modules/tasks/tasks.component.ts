import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectsQuery} from '../../../../state/projects/projects.query';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {Task} from '../../../../models/entity.model';
import {TableModel, TableRow} from '../../../../components/table/table.model';
import * as dayjs from 'dayjs';
import {MatDialog} from '@angular/material/dialog';
import {TaskEditComponent} from '../../../task-edit/task-edit.component';

@Component({
    selector: 'tsm-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.less']
})
export class TasksComponent implements OnInit, OnDestroy {

    _projectId: number;

    _isLoading = false;

    _tasks: Task[];

    _model: TableModel;

    _selectedTasks: Set<number> = new Set();

    private destroyStream$ = new Subject();

    constructor(private http: HttpService,
                private route: ActivatedRoute,
                private projectsQuery: ProjectsQuery,
                private router: Router,
                private cdr: ChangeDetectorRef,
                private matDialog: MatDialog) {
    }

    ngOnInit(): void {
        const idFromRoute = this.route.snapshot.queryParamMap.get('projectId');
        this._projectId = parseInt(idFromRoute, 10) || (this.projectsQuery.selected || {}).id;
        if (this._projectId) {
            this.load();
        }
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    _selectTasks(ids: number[]): void {
        ids.forEach(id => this._selectedTasks.add(id));
    }

    _unselectTasks(ids: number[]): void {
        ids.forEach(id => this._selectedTasks.delete(id));
    }

    _createTask(): void {
        this.matDialog.open(TaskEditComponent, {
            data: {
                onSubmit: (task: Task) => {
                    this.http.createTask({
                        ...task,
                        projectId: this._projectId
                    })
                        .pipe(
                            takeUntil(this.destroyStream$)
                        )
                        .subscribe(() => {
                            this.load()
                        });
                }
            }
        });
    }

    _deleteSelected(): void {
        const ids = Array.from(this._selectedTasks);
        this.http.deleteTasks({taskIds: ids})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe(() => {
                this.load();
            });
    }

    private load() {
        this._isLoading = true;
        this.http.getProjectBacklogTasks({projectId: this._projectId})
            .pipe(
                finalize(() => this._isLoading = false),
                takeUntil(this.destroyStream$)
            )
            .subscribe((tasks) => {
                this._tasks = tasks;
                this._model = this.tasksToTable(tasks);
                this.cdr.markForCheck();
            });
    }

    private tasksToTable(tasks: Task[]): TableModel {
        return {
            header: this.getTableHeader(),
            rows: tasks.map(this.taskToRow.bind(this))
        };
    }

    private taskToRow(task: Task): TableRow {
        return {
            id: task.id,
            columns: [
                {
                    value: `${task.code} ${task.name}`
                },
                {
                    value: task.dueDate && dayjs(task.dueDate).format('DD/MM') || '-'
                },
                {
                    value: String(task.storyPoints || 0)
                },
                {
                    value: task.estimate && `${task.estimate} hours` || '-'
                }
            ]
        };
    }

    private getTableHeader(): TableRow {
        return {
            columns: [
                {
                    value: 'Task'
                },
                {
                    value: 'Due Date'
                },
                {
                    value: 'Story Points'
                },
                {
                    value: 'Expected Duration'
                }
            ]
        };
    }

}
