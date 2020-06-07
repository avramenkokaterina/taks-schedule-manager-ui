import {Component, OnInit} from '@angular/core';
import {SprintsQuery} from '../../../../state/sprints/sprints.query';
import {filter, switchMap} from 'rxjs/operators';
import {HttpService} from '../../../../services/http/http.service';

@Component({
    selector: 'tsm-statistic',
    templateUrl: './statistic.component.html',
    styleUrls: ['./statistic.component.less']
})
export class StatisticComponent implements OnInit {

    _sprint$ = this.sprintsQuery.selectActive();

    _tasks$ = this._sprint$
        .pipe(
            filter((sprint) => !!sprint),
            switchMap((sprint) => {
                return this.http.getTasksBySprint({sprintId: sprint.id});
            })
        );

    _users$ = this._sprint$
        .pipe(
            filter((sprint) => !!sprint),
            switchMap((sprint) => {
                return this.http.usersByProject({projectId: sprint.projectId});
            })
        );

    constructor(private sprintsQuery: SprintsQuery,
                private http: HttpService) {
    }

    ngOnInit(): void {

    }

}
