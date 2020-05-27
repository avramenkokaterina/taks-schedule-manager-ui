import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {SprintsState} from './sprints.state';
import {SprintsStore} from './sprints.store';

@Injectable({providedIn: 'root'})
export class SprintsQuery extends QueryEntity<SprintsState> {


    constructor(protected store: SprintsStore) {
        super(store);
    }
}
