import {Injectable, OnDestroy} from '@angular/core';
import {ProjectsQuery} from './projects.query';
import {ProjectsStore} from './projects.store';
import {HttpService} from '../../services/http/http.service';
import {AppQuery} from '../app/app.query';
import {Observable, Subject} from 'rxjs';
import {finalize, takeUntil, tap} from 'rxjs/operators';
import {DefaultResponse, Project} from '../../models/entity.model';
import {nullDelete} from '../../utils/null-delete';
import {TasksStore} from '../tasks/tasks.store';
import {SprintsStore} from '../sprints/sprints.store';

@Injectable({providedIn: 'root'})
export class ProjectsService implements OnDestroy {

    private destroyStream$ = new Subject();

    constructor(private projectsQuery: ProjectsQuery,
                private projectsStore: ProjectsStore,
                private http: HttpService,
                private appQuery: AppQuery,
                private tasksStore: TasksStore,
                private sprintsStore: SprintsStore) {
    }

    fetch(selected?: number): void {
        this.sprintsStore.setLoading(true);
        this.http.projectsByUser({userId: this.appQuery.userId})
            .pipe(
                finalize(() => this.projectsStore.setLoading(false)),
                takeUntil(this.destroyStream$)
            )
            .subscribe((value) => {
                this.projectsStore.set(value);
                if (selected) {
                    this.setSelected(selected);
                }
            });
    }

    setSelected(id: number): void {
        this.projectsStore.update(state => ({
            ...state,
            selected: this.projectsQuery.getEntity(id)
        }));
        this.tasksStore.set([]);
        this.sprintsStore.setActive(null);
    }

    create(project: Project): void {
        this.http.createProject({...nullDelete(project), ownerId: this.appQuery.userId})
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(() => {
                this.fetch();
            });
    }

    update(project: Partial<Project>): Observable<DefaultResponse> {
        return this.http.editProject(nullDelete(project) as Project)
            .pipe(
                takeUntil(this.destroyStream$),
                tap(() => {
                    if (project.id === (this.projectsQuery.selected && this.projectsQuery.selected.id)) {
                        this.setSelected(project.id);
                    }
                    this.fetch();
                })
            );
    }

    delete(id: number): void {
        this.http.deleteProject({projectId: id})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe(() => this.projectsStore.remove(id)
            );
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }
}
