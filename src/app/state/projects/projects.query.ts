import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ProjectsState} from './projects.state';
import {ProjectsStore} from './projects.store';
import {Project} from '../../models/entity.model';

@Injectable({providedIn: 'root'})
export class ProjectsQuery extends QueryEntity<ProjectsState> {
    constructor(protected store: ProjectsStore) {
        super(store);
    }

    get selected(): Project {
        return this.store.getValue().selected;
    }
}
