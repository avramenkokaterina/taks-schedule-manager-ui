import {Injectable} from '@angular/core';
import {ProjectsQuery} from './projects.query';
import {ProjectsStore} from './projects.store';

@Injectable()
export class ProjectsService {
    constructor(private projectsQuery: ProjectsQuery,
                private projectsStore: ProjectsStore) {
    }

    setSelected(id: number): void {
        this.projectsStore.update(state => ({
            ...state,
            selected: this.projectsQuery.getEntity(id)
        }))
    }
}
