import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SprintsQuery} from '../../../../state/sprints/sprints.query';
import {HttpService} from '../../../../services/http/http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GanChartInfo, Sprint} from '../../../../models/entity.model';
import {AxisDay, AxisModel, AxisWeek} from './gan-chart.model';
import {SprintsService} from '../../../../state/sprints/sprints.service';
import {Observable, Subject} from 'rxjs';
import {filter, map, takeUntil, tap} from 'rxjs/operators';
import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import {labelByStatus} from '../../../../models/status.consts';

dayjs.extend(weekday);

@Component({
    selector: 'tsm-gan-chart',
    templateUrl: './gan-chart.component.html',
    styleUrls: ['./gan-chart.component.less']
})
export class GanChartComponent implements OnInit, OnDestroy {

    _chartModel: GanChartInfo[] = [];

    _sprint$: Observable<Sprint> = this.sprintsQuery.selectActive().pipe(
        filter(sprint => !!sprint),
        tap(sprint => {
            this.sprintId = sprint.id;
            this.router.navigate([], {
                    relativeTo: this.route,
                    queryParamsHandling: 'merge',
                    replaceUrl: true,
                    queryParams: {sprintId: sprint.id}
                }
            );
            this._load();
        })
    );

    _axisModel: Observable<AxisModel> = this._sprint$
        .pipe(
            map((sprint) => this.intervalToModel(sprint.startDate, sprint.endDate))
        );

    _hourWidth = 6; // In pixels
    _dayWidthPx = (this._hourWidth * 8) + 'px';

    _labelByStatus = labelByStatus;

    private sprintId: number;

    private destroyStream$ = new Subject();

    constructor(private sprintsQuery: SprintsQuery,
                private sprintsService: SprintsService,
                private http: HttpService,
                private route: ActivatedRoute,
                private router: Router,
                private cdr: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.sprintId = parseInt(this.route.snapshot.queryParamMap.get('sprintId'), 10);
        if (this.sprintId) {
            this.sprintsService.fetchActiveById(this.sprintId);
        }
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }


    _load(): void {
        this.http.sprintGanChart({sprintId: this.sprintId})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe((value) => {
                this._chartModel = value;
                this.cdr.markForCheck();
            });
    }

    private intervalToModel(start: string, end: string): AxisModel {
        const startDate = start && dayjs(start);
        const endDate = end && dayjs(end);
        let tempDate = startDate;

        let weeks: AxisWeek[] = [];
        let days: AxisDay[] = [];
        if (tempDate && endDate) {
            while (!tempDate.isAfter(endDate, 'day')) {
                const dayOfWeek = tempDate.weekday();
                if (!((dayOfWeek === 6) || (dayOfWeek === 5))) {
                    days.push({
                        isToday: tempDate.isSame(dayjs(), 'day'),
                        value: tempDate,
                        title: tempDate.format('dd')
                    });
                    if (dayOfWeek === 4) {
                        if (days.length) {
                            weeks.push({
                                days: days,
                                title: days[0].value.format('ddd DD MMM YYYY')
                            });
                            days = [];
                        }
                    }
                }
                tempDate = tempDate.add(1, 'day');
            }
        }
        return {
            weeks: weeks
        };
    }

}
