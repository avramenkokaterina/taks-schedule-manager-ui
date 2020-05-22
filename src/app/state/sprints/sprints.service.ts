import {Injectable} from '@angular/core';
import {SprintsQuery} from './sprints.query';
import {SprintsStore} from './sprints.store';
import {HttpService} from '../../services/http/http.service';

@Injectable({providedIn: 'root'})
export class SprintsService {
    constructor(private query: SprintsQuery,
                private store: SprintsStore,
                private http: HttpService) {
    }
}
