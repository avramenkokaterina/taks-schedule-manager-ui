import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../../services/http/http.service';
import {Router} from '@angular/router';

@Component({
    selector: 'tsm-account-creation',
    templateUrl: './account-creation.component.html',
    styleUrls: ['./account-creation.component.less']
})
export class AccountCreationComponent implements OnInit {

    _color: string = '#fff500';

    _formGroup: FormGroup;

    _positions = [
        'Dev',
        'BA',
        'PO',
        'Tester'
    ]

    constructor(private http: HttpService,
                private router: Router) {
        window['aaa'] = this;
    }

    ngOnInit(): void {
        this._formGroup = new FormGroup({
            login: new FormControl(null, Validators.required),
            fullName: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
            password: new FormControl(null, Validators.required),
            position: new FormControl(this._positions[0], Validators.required)
        });
    }

    _register(): void {
        this.http.registerUser({
            ...this._formGroup.value,
            color: this._color
        }).subscribe(() => {
            this.router.navigate(['auth']);
        });
    }

}
