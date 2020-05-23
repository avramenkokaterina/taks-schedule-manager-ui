import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../../../models/entity.model';

@Component({
    selector: 'tsm-task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.less']
})
export class TaskCardComponent implements OnInit {

    @Input()
    task: Task;

    constructor() {
    }

    ngOnInit(): void {
    }

}
