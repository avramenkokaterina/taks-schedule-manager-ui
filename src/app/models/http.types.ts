import {Observable} from 'rxjs';

export enum RemoteProceduresNames {
    signIn = 'signIn',
    assignTaskToSprint = 'assignTaskToSprint',
    assignUser = 'assignUser',
    createProject = 'createProject',
    createSprint = 'createSprint',
    createSprintSchedule = 'createSprintSchedule',
    createTask = 'createTask',
    editProject = 'editProject',
    editSprint = 'editSprint',
    editTask = 'editTask',
    deleteProject = 'deleteProject',
    getProjectBacklogTasks = 'getProjectBacklogTasks',
    getTasksByProject = 'getTasksByProject',
    getTasksBySprint = 'getTasksBySprint',
    projectsByUser = 'projectsByUser',
    registerUser = 'registerUser',
    sprintById = 'sprintById',
    sprintGanChart = 'sprintGanChart',
    status = 'status',
    unassignUser = 'unassignUser',
    usersByProject = 'usersByProject',
    usersNotInProject = 'usersNotInProject',
    deleteTasks = 'deleteTasks',
    endSprint = 'endSprint',
    signOut = 'signOut'
}

export type HttpServiceType = {
    [key in RemoteProceduresNames]: (any) => Observable<any>;
}
