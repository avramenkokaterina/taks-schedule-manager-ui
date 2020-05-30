import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Project} from '../../../../../../models/entity.model';
import {FormControl, FormGroup} from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
    selector: 'tsm-project-edit',
    templateUrl: './project-edit.component.html',
    styleUrls: ['./project-edit.component.less']
})
export class ProjectEditComponent implements OnInit {

    _formGroup: FormGroup;
    _isEdit = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { project?: Project, onSubmit: (project: Project) => void }) {
    }

    ngOnInit(): void {
        this._formGroup = new FormGroup({
            id: new FormControl(null),
            name: new FormControl(null),
            code: new FormControl(null),
            startDate: new FormControl(null),
            dueDate: new FormControl(null)
        });

        if (this.data && this.data.project) {
            this._formGroup.patchValue(this.data.project);
        }
    }

    _submit(): void {
        this.data.onSubmit({
            ...this._formGroup.value,
            startDate: this._formGroup.value.startDate && dayjs(this._formGroup.value.startDate).format(),
            dueDate: this._formGroup.value.dueDate && dayjs(this._formGroup.value.dueDate).format()
        });
    }
}
