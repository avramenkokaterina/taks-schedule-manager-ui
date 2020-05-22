import {Injectable, OnDestroy} from '@angular/core';
import {ProjectsQuery} from './projects.query';
import {ProjectsStore} from './projects.store';
import {HttpService} from '../../services/http/http.service';
import {AppQuery} from '../app/app.query';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Project} from '../../models/entity.model';
import {nullDelete} from '../../utils/null-delete';

@Injectable({providedIn: 'root'})
export class ProjectsService implements OnDestroy {

    private destroyStream$ = new Subject();

    constructor(private projectsQuery: ProjectsQuery,
                private projectsStore: ProjectsStore,
                private http: HttpService,
                private appQuery: AppQuery) {
    }

    fetch(): void {
        this.http.projectsByUser({userId: this.appQuery.userId})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe((value) => {
                this.projectsStore.set(value);
            });
    }

    setSelected(id: number): void {
        this.projectsStore.update(state => ({
            ...state,
            selected: this.projectsQuery.getEntity(id)
        }));
    }

    create(project: Project): void {
        this.http.createProject({...nullDelete(project), ownerId: this.appQuery.userId})
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(() => {
                this.fetch();
            });
    }

    update(project: Project): void {
        this.http.editProject(nullDelete(project))
            .pipe(takeUntil(this.destroyStream$))
            .subscribe(() => {
                this.fetch();
            });
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
