import {ActiveState, EntityState} from '@datorama/akita';
import {Sprint} from '../../models/entity.model';

export interface SprintsState extends EntityState<Sprint>, ActiveState {
    // readonly active: Sprint;
}
