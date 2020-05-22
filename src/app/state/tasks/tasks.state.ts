import {EntityState} from '@datorama/akita';
import {Task} from '../../models/entity.model'

export interface TasksState extends EntityState<Task> {
}
