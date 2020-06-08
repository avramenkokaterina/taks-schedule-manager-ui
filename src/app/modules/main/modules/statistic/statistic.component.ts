import {Component, OnInit} from '@angular/core';
import {SprintsQuery} from '../../../../state/sprints/sprints.query';
import {filter, switchMap, tap} from 'rxjs/operators';
import {HttpService} from '../../../../services/http/http.service';

@Component({
    selector: 'tsm-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.less']
})
export class StatisticComponent implements OnInit {

    _sprintLoading$ = this.sprintsQuery.selectLoading();

    _tasksLoading = false;
    _usersLoading = false;

    _sprint$ = this.sprintsQuery.selectActive()
        .pipe(
            filter((sprint) => !!sprint),
            tap(() => {
                this._tasksLoading = true;
                this._usersLoading = true;
            }),
        );

    _tasks$ = this._sprint$
        .pipe(
            tap(() => this._tasksLoading = false),
            switchMap((sprint) => {
                return this.http.getTasksBySprint({sprintId: sprint.id})
                    .pipe(tap(() => this._tasksLoading = false));
            })
        );

    _users$ = this._sprint$
        .pipe(
            switchMap((sprint) => {
                return this.http.usersByProject({projectId: sprint.projectId})
                    .pipe(tap(() => this._usersLoading = false));
            })
        );

    constructor(private sprintsQuery: SprintsQuery,
                private http: HttpService) {
        window['aaa'] = this;
    }

    ngOnInit(): void {

    }

}
