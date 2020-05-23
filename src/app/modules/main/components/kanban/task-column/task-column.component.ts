import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Task, TaskStatus} from '../../../../../models/entity.model';
import {colorByStatus, labelByStatus} from '../../../../../models/status.consts';

@Component({
    selector: 'tsm-task-column',
    templateUrl: './task-column.component.html',
    styleUrls: ['./task-column.component.less']
})
export class TaskColumnComponent implements OnChanges {

    @Input()
    tasks: Task[];

    @Input()
    status: TaskStatus;

    _color: string;

    _tasks: Task[];

    _labelByStatus = labelByStatus;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        this._tasks = this.tasks.filter((task) => task.status === this.status);
        this._color = colorByStatus[this.status];
    }
}
