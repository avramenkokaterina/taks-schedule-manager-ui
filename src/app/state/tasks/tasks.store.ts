import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {TasksState} from './tasks.state';

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'tasks'})
export class TasksStore extends EntityStore<TasksState> {
    constructor() {
        super();
    }
}
