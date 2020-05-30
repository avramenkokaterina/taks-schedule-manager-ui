import {Injectable, OnDestroy} from '@angular/core';
import {SprintsQuery} from './sprints.query';
import {SprintsStore} from './sprints.store';
import {HttpService} from '../../services/http/http.service';
import {Observable, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {DefaultResponse, ResponseWIthId, ResponseWIthSprint, Sprint} from '../../models/entity.model';
import {nullDelete} from '../../utils/null-delete';

@Injectable({providedIn: 'root'})
export class SprintsService implements OnDestroy {

    private destroyStream$ = new Subject();

    constructor(private query: SprintsQuery,
                private store: SprintsStore,
                private http: HttpService) {
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    fetchActiveById(sprintId: number): void {
        this.http.sprintById({sprintId})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe((sprint) => {
                this.store.add(sprint);
                this.store.setActive(sprint.id);
            });
    }

    edit(sprint: Sprint): Observable<DefaultResponse> {
        return this.http.editSprint(sprint)
            .pipe(
                takeUntil(this.destroyStream$),
                tap(() => {
                    this.store.updateActive(sprint);
                })
            );
    }

    create(sprint: Sprint): Observable<ResponseWIthSprint> {
        return this.http.createSprint(nullDelete(sprint))
            .pipe(
                tap((response) => {
                    this.store.updateActive(response.sprint)
                })
            );
    }

    resetActive(): void {
        this.query.hasActive() && this.store.setActive(null);
    }
}
