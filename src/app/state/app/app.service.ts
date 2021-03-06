import {Injectable} from '@angular/core';
import {AppStore} from './app.store';
import {HttpService} from '../../services/http/http.service';
import {Router} from '@angular/router';
import {USER_ID_NAME} from '../../models/app.consts';
import {CookieService} from 'ngx-cookie-service';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../../models/entity.model';

@Injectable({providedIn: 'root'})
export class AppService {
    constructor(private store: AppStore,
                private http: HttpService,
                private router: Router,
                private cookieService: CookieService) {
    }

    public signIn(credential: Credential): void {
        this.http.signIn(credential).subscribe((response) => {
            this.router.navigate(['main']);
            this.setUserId(response[USER_ID_NAME]);
            this.cookieService.set(USER_ID_NAME, response[USER_ID_NAME] ? String(response[USER_ID_NAME]) : '');
        });
    }

    public signOut(): void {
        this.cookieService.delete(USER_ID_NAME);
        this.http.signOut()
            .subscribe(() => {
                this.store.update(state => {
                    return {
                        ...state,
                        userId: null
                    };
                });
            });
    }

    public setUserId(id: number): void {
        this.store.update(state => {
            return {
                ...state,
                userId: id
            };
        });
    }
}
