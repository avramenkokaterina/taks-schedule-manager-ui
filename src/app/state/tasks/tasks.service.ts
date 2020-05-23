import {Injectable, OnDestroy} from '@angular/core';
import {TasksQuery} from './tasks.query';
import {TasksStore} from './tasks.store';
import {HttpService} from '../../services/http/http.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TasksService implements OnDestroy {

    private destroyStream$ = new Subject();

    constructor(private query: TasksQuery,
                private store: TasksStore,
                private http: HttpService) {
    }

    fetchBySprintId(sprintId: number): void {
        this.http.getTasksBySprint({sprintId})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe((tasks) => {
                this.store.set(tasks);
            });
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }
}
