import {Component, Inject, OnInit} from '@angular/core';
import {Task, TaskStatus} from '../../models/entity.model';
import {labelByStatus} from '../../models/status.consts';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as dayjs from 'dayjs';

@Component({
    selector: 'tsm-task-edit',
    templateUrl: './task-edit.component.html',
    styleUrls: ['./task-edit.component.less']
})
export class TaskEditComponent implements OnInit {

    _formGroup: FormGroup;

    _task: Task;

    _statuses: TaskStatus[] = Object.values(TaskStatus);

    _labelByStatus = labelByStatus;

    constructor(@Inject(MAT_DIALOG_DATA) private data: { task?: Task, onSubmit: (task: Task) => void }) {
    }

    ngOnInit(): void {
        const task = this.data.task;
        this._task = task;
        this._formGroup = new FormGroup({
            name: new FormControl(null),
            dueDate: new FormControl(null),
            estimate: new FormControl(null),
            storyPoints: new FormControl(null),
            description: new FormControl(null),
        });

        if (task) {
            this._formGroup.addControl('id', new FormControl(null));
            this._formGroup.addControl('status', new FormControl(null));
            this._formGroup.addControl('actualDuration', new FormControl(null));
            this._formGroup.patchValue(task);
        }
    }

    _save() {
        this.data.onSubmit(
            {
                ...this._formGroup.value,
                dueDate: this._formGroup.value.dueDate && dayjs(this._formGroup.value.dueDate).format()
            }
        );
    }

}
