import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Sprint, Task, TaskStatus} from '../../models/entity.model';
import * as dayjs from 'dayjs';

type WidgetModel = Readonly<{
    iconId: string;
    color: string;
    currentCount: number;
    totalCount?: number;
    label: string;
    name: string;
}>;

enum ScheduleStatus {
    ON = 'on schedule',
    AHEAD = 'ahead of schedule',
    BEHIND = 'behind of schedule'
}

@Component({
    selector: 'tsm-sprint-widgets',
    templateUrl: './sprint-widgets.component.html',
    styleUrls: ['./sprint-widgets.component.less']
})
export class SprintWidgetsComponent implements OnChanges {

    @Input()
    tasks: Task[];

    @Input()
    sprint: Sprint;

    @Input()
    isKanban = false;

    _models: WidgetModel[] = [];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const open = this.tasks.filter(task => task.status === TaskStatus.OPEN);
        const inProgress = this.tasks.filter(task => task.status === TaskStatus.CLOSED);
        const canceled = this.tasks.filter(task => task.status === TaskStatus.CANCELED);
        const closed = this.tasks.filter(task => task.status === TaskStatus.CLOSED);

        this._models = [
            {
                color: '#81B29A',
                name: this.getScheduleStatus(this.tasks),
                iconId: 'check-circle',
                currentCount: closed.length,
                label: 'completed',
                totalCount: this.tasks.length
            },
            {
                color: '#C86F57',
                name: 'overdue',
                label: 'tasks',
                iconId: 'warning',
                currentCount: this.getOverdue([...open, ...inProgress]),
                totalCount: this.tasks.length
            },
            {
                color: '#3D405B',
                iconId: 'speed',
                currentCount: this.getStoryPoints([...closed, ...canceled]),
                totalCount: this.getStoryPoints(this.tasks),
                label: 'story points',
                name: 'team speed'
            }];
        if (this.isKanban) {
            this._models.push(
                {
                    color: '#F2CC8F',
                    iconId: 'big-calendar',
                    currentCount: dayjs(this.sprint.endDate).diff(dayjs(), 'day'),
                    label: 'days till',
                    name: 'sprint review'
                }
            );
        } else {
            this._models.push(
                {
                    color: '#F2CC8F',
                    iconId: 'big-calendar',
                    label: 'days',
                    name: 'sprint duration',
                    currentCount: dayjs(this.sprint.endDate).diff(dayjs(this.sprint.startDate), 'day')
                }
            );
        }
    }

    private getStoryPoints(tasks: Task[]): number {
        return tasks.reduce((result, task) => {
            return result + (task.storyPoints || 0);
        }, 0);
    }

    private getOverdue(tasks: Task[]): number {
        return tasks.reduce((result, task) => {
            return task.dueDate && dayjs(task.dueDate).isBefore(dayjs()) ? ++result : result;
        }, 0);
    }

    private getScheduleStatus(tasks: Task[]): ScheduleStatus {
        const resultPoints = tasks.reduce((result, task) => {
            if (task.estimate && task.actualDuration) {
                if (task.estimate > task.actualDuration) {
                    return result + 1;
                } else if (task.estimate < task.actualDuration) {
                    return result - 1;
                }
            }
            return result;
        }, 0);

        if (resultPoints < 0) {
            return ScheduleStatus.BEHIND;
        } else if (resultPoints > 0) {
            return ScheduleStatus.AHEAD;
        } else {
            return ScheduleStatus.ON;
        }
    }

}
