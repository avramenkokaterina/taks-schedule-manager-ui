import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ProjectsState} from './projects.state';

@Injectable()
export class ProjectsQuery extends QueryEntity<ProjectsState> {

}
