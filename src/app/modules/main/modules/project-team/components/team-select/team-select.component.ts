import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {HttpService} from '../../../../../../services/http/http.service';
import {User} from '../../../../../../models/user.model';
import {forkJoin, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'tsm-team-select',
    templateUrl: './team-select.component.html',
    styleUrls: ['./team-select.component.less']
})
export class TeamSelectComponent implements OnInit, OnDestroy {

    _users: User[];

    _isLoading = false;

    _value: User[] = [];

    _compareFn = (a: User, b: User) => a.id === b.id;

    private projectId: number;

    private destroyStream$ = new Subject();

    private selectedUsers: User[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public data: { projectId: number, onSubmit: (selectedUsers: User[]) => void },
                private http: HttpService) {
    }

    ngOnInit(): void {
        this._isLoading = true;
        this.projectId = this.data.projectId;
        forkJoin([
            this.http.usersByProject({projectId: this.projectId}),
            this.http.usersNotInProject({projectId: this.projectId})
        ])
            .pipe(
                finalize(() => this._isLoading = false),
                takeUntil(this.destroyStream$)
            )
            .subscribe(([usersIn, usersOut]) => {
                this._value = usersIn;
                this._users = [...usersIn, ...usersOut].sort((a: User, b: User) => a.fullName.localeCompare(b.fullName));
                this.selectedUsers = usersIn;
            });
    }

    ngOnDestroy() {
        this.destroyStream$.next();
        this.destroyStream$.complete();
    }

    _save() {
        this.data.onSubmit(this.selectedUsers);
    }

    _valueChange(value: User[]) {
        this.selectedUsers = value;
    }

}
