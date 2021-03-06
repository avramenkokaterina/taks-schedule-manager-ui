import {Injectable} from '@angular/core';
import {EntityStore, StoreConfig} from '@datorama/akita';
import {ProjectsState} from './projects.state';

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'projects'})
export class ProjectsStore extends EntityStore<ProjectsState> {
    constructor() {
        super();
    }
}
