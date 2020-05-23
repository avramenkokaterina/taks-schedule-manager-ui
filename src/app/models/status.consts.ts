import {TaskStatus} from './entity.model';

export const colorByStatus: {[key in TaskStatus]: string} = {
    [TaskStatus.OPEN]: '#F2CC8F',
    [TaskStatus.IN_PROGRESS]: '#3D405B',
    [TaskStatus.CANCELED]: '#C4C4C4',
    [TaskStatus.CLOSED]: '#81B29A'
};

export const labelByStatus: {[key in TaskStatus]: string} = {
    [TaskStatus.OPEN]: 'Open',
    [TaskStatus.IN_PROGRESS]: 'In Progress',
    [TaskStatus.CANCELED]: 'Canceled',
    [TaskStatus.CLOSED]: 'Closed'
}
