import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../../services/http/http.service';
import {ProjectsQuery} from '../../../../state/projects/projects.query';
import {User} from '../../../../models/user.model';
import {Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {TeamSelectComponent} from './components/team-select/team-select.component';

@Component({
    selector: 'tsm-project-team',
    templateUrl: './project-team.component.html',
    styleUrls: ['./project-team.component.less']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

    _isLoading = false;

    _users: User[];

    _projectId: number;

    private destroyStream$ = new Subject();

    constructor(private projectsQuery: ProjectsQuery,
                private http: HttpService,
                private cdr: ChangeDetectorRef,
                private matDialog: MatDialog) {
    }

    ngOnInit(): void {
        this._projectId = this.projectsQuery.selected && this.projectsQuery.selected.id;
        if (this._projectId) {
            this.load();
        }
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    _delete(id: number) {
        this._users = this._users.filter(user => user.id !== id);
        this.http.unassignUser({userId: id, projectId: this._projectId})
            .pipe(
                takeUntil(this.destroyStream$)
            )
            .subscribe(() => {
                this.load();
            });
    }

    _manageTeam() {
        this.matDialog.open(TeamSelectComponent, {
            data: {
                projectId: this._projectId,
                onSubmit: (selected: User[]) => {
                    this.http.assignUser({
                        userIds: selected.map(user => user.id),
                        projectId: this._projectId
                    }).subscribe(() => {
                        this.load();
                    });
                }
            }
        });
    }

    private load() {
        this._isLoading = true;
        this.http.usersByProject({projectId: this._projectId})
            .pipe(
                takeUntil(this.destroyStream$),
                finalize(() => {
                    this._isLoading = false;
                    this.cdr.markForCheck();
                })
            )
            .subscribe((users) => {
                this._users = users;
            });
    }
}
