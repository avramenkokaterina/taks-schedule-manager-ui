import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {Task, TaskStatus} from '../../../../../models/entity.model';
import {colorByStatus, labelByStatus} from '../../../../../models/status.consts';
import {Subject} from 'rxjs';

@Component({
    selector: 'tsm-task-column',
    templateUrl: './task-column.component.html',
    styleUrls: ['./task-column.component.less']
})
export class TaskColumnComponent implements OnChanges, OnDestroy {

    @Input()
    tasks: Task[];

    @Input()
    status: TaskStatus;

    @Output()
    taskClick: EventEmitter<Task> = new EventEmitter<Task>();

    _color: string;

    _tasks: Task[];

    _labelByStatus = labelByStatus;

    private destroyStream$ = new Subject();

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._tasks = this.tasks.filter((task) => task.status === this.status);
        this._color = colorByStatus[this.status];
    }

    _taskClick(task: Task) {
        this.taskClick.emit(task);
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }
}
