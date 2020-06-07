import {Component, HostBinding, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../../state/app/app.service';
import {AppQuery} from '../../state/app/app.query';

@Component({
    selector: 'tsm-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class TSMLoginComponent implements OnInit {

    @HostBinding('class') private classes = 'auth-component';

    _formGroup: FormGroup = new FormGroup({
        login: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)
    })

    constructor(private appService: AppService,
                private appQuery: AppQuery) {
    }

    ngOnInit(): void {
        if (this.appQuery.userId) {
            this.appService.signOut();
        }
    }

    _login(): void {
        this.appService.signIn(this._formGroup.value);
    }

}
