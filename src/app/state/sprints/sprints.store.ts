import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {SprintsState} from './sprints.state';

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'sprints'})
export class SprintsStore extends EntityStore<SprintsState> {
    constructor() {
        super();
    }
}
