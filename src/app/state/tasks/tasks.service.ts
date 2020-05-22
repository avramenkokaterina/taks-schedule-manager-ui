import {Injectable} from '@angular/core';
import {TasksQuery} from './tasks.query';
import {TasksStore} from './tasks.store';
import {HttpService} from '../../services/http/http.service';

@Injectable({providedIn: 'root'})
export class TasksService {
constructor(private query: TasksQuery,
            private store: TasksStore,
            private http: HttpService) {
    }
}
