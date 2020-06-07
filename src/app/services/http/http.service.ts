import {Injectable} from '@angular/core';
import {HttpAbstractService} from './http-abstract.service';
import {RemoteProceduresNames} from '../../models/http.types';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {EMPTY, throwError} from 'rxjs';

@Injectable()
// @ts-ignore
export class HttpService extends HttpAbstractService {
    constructor(private http: HttpClient,
                private router: Router) {
        super();
        Object.values(RemoteProceduresNames).forEach(procedure => {
            const self = this;
            // @ts-ignore
            this[procedure] = function(args) {
                return self.http.post(`api/${procedure}`, args)
                    .pipe(
                        catchError(err => self.handleError(err))
                    );
            }
        });
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 403) {
            this.router.navigate(['auth'])
            return EMPTY;
        } else {
            return throwError(error);
        }
    }
}
