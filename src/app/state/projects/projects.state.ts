import {EntityState} from '@datorama/akita';
import {Project} from '../../models/entity.model';

export interface ProjectsState extends EntityState<Project> {
    readonly selected: Project;
}
