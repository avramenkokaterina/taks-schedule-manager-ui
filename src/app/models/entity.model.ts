import {User} from './user.model';

export interface SprintProjectIds {
    readonly sprintId: number;
    readonly projectId: number;
}

export interface UserProjectIds {
    readonly userId: number;
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
    COMPLETE = 'complete'
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
}>;

export interface UserId {
    userId: number;
}

export type GanChartInfo = Readonly<{
    user: User;
    notCompleted: number;
    total: number;
    tasks: Task[];
}>;

export interface DefaultResponse {
    readonly response: string;
}
