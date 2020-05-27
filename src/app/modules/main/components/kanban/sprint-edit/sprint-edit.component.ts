import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Sprint} from '../../../../../models/entity.model';
import {FormControl, FormGroup} from '@angular/forms';
import * as dayjs from 'dayjs';
import {ParametersPanelModel} from '../../../../../components/parameters-panel/parameters-panel.model';
import {TableModel, TableRow} from '../../../../../components/table/table.model';
import {Task} from '../../../../../models/entity.model'
import {HttpService} from '../../../../../services/http/http.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tsm-sprint-edit',
    templateUrl: './sprint-edit.component.html',
    styleUrls: ['./sprint-edit.component.less']
})
export class SprintEditComponent implements OnInit, OnDestroy {

    _formGroup: FormGroup;

    _sprint: Sprint;

    _taskTableModel: TableModel;

    _metrics: ParametersPanelModel[] = [
        {
            label: 'Total Tasks',
            value: '0'
        },
        {
            label: 'Total Story Points',
            value: '0'
        },
        {
            label: 'Total expected duration',
            value: '0'
        }
    ];

    _tasks: Task[];
    private selectedTasks: Set<number> = new Set();

    private destroyStream$ = new Subject();

    constructor(@Inject(MAT_DIALOG_DATA) private data: { sprint: Sprint, onSave: (sprint: Sprint, selectedSet: Set<number>) => void },
                private http: HttpService) {
    }

    ngOnInit(): void {
        const controls = {
            name: new FormControl(null),
            startDate: new FormControl(null),
            endDate: new FormControl(null)
        };

        this._formGroup = new FormGroup(controls);

        this._sprint = this.data && this.data.sprint;

        if (this._sprint) {
            this._formGroup.addControl('id', new FormControl(this._sprint.id));
            this._formGroup.patchValue(this._sprint);
            this.http.getProjectBacklogTasks({projectId: this.data.sprint.projectId, sprintId: this._sprint.id})
                .pipe(takeUntil(this.destroyStream$))
                .subscribe((tasks) => {
                    this._tasks = tasks;
                    tasks.forEach((task) => task.sprintId === this._sprint.id && this.selectedTasks.add(task.id));
                    this._taskTableModel = this.tasksToTable(tasks);
                });

        }

    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    _selectTasks(ids: number[]): void {
        ids.forEach(id => this.selectedTasks.add(id));
    }

    _unselectTasks(ids: number[]): void {
        ids.forEach(id => this.selectedTasks.delete(id));
    }

    private getSprint(): Sprint {
        return {
            ...this._formGroup.value,
            startDate: this._formGroup.value.startDate && dayjs(this._formGroup.value.startDate).format(),
            endDate: this._formGroup.value.endDate && dayjs(this._formGroup.value.dueDate).format()
        };
    }

    _save(): void {
        this.data.onSave(this.getSprint(), this.selectedTasks);
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
            selected: this.selectedTasks.has(task.id),
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
