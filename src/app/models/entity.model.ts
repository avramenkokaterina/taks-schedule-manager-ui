import {User} from './user.model';

export interface SprintProjectIds {
    readonly sprintId?: number;
    readonly projectId: number;
}

export interface UserProjectIds {
    readonly userId: number;
    readonly projectId: number;
}

export interface UsersProjectIds {
    readonly userIds: number[];
    readonly projectId: number;
}

export type Project = Readonly<{
    id?: number;
    code: string;
    name: string;
    ownerId: number;
    activeSprintId?: number;
    dueDate?: string;
    startDate?: string;
    sprint?: string;
    userCount?: number;
    backlogCount?: number;
    storyPoints?: number;
    overdues?: number;
    sprintCode?: string;
}>;

export interface ProjectId {
    readonly projectId: number;
}

export type Sprint = Readonly<{
    id?: number;
    name: string;
    projectId: number;
    startDate?: string;
    endDate?: string;
    readonly?: boolean;
    tasks?: number[];
}>;

export interface SprintId {
    readonly sprintId: number;
}

export interface SprintTaskIds {
    readonly sprintId: number;
    readonly taskId: number;
}

export enum TaskStatus {
    OPEN = 'open',
    IN_PROGRESS = 'in_progress',
    CANCELED = 'canceled',
    CLOSED = 'closed'
}

export type Task = Readonly<{
    id?: number;
    estimate?: number;
    dateFrom?: string;
    dateTo?: string;
    status: TaskStatus;
    userId?: number;
    sprintId?: number;
    projectId: number;
    dueDate?: string;
    storyPoints?: number;
    description?: string;
    name: string;
    code: string;
    order?: number;
    color?: string;
    userName?: string;
    actualDuration?: number;
}>;

export interface UserId {
    userId: number;
}

export type GanChartInfo = Readonly<{
    user: User;
    completed: number;
    total: number;
    tasks: Task[];
}>;

export interface DefaultResponse {
    readonly response: string;
}

export interface ResponseWIthId extends DefaultResponse {
    readonly id: number;
}

export interface ResponseWIthSprint extends DefaultResponse {
    readonly sprint: Sprint;
}
