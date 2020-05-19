import {HttpServiceType} from '../../models/http.types';
import {Observable} from 'rxjs';
import {SignInResponse} from '../../models/auth.types';
import {
    DefaultResponse,
    GanChartInfo,
    Project,
    ProjectId,
    Sprint,
    SprintId,
    SprintProjectIds,
    SprintTaskIds,
    Task,
    UserId,
    UserProjectIds
} from '../../models/entity.model';
import {User} from '../../models/user.model';

export abstract class HttpAbstractService implements HttpServiceType {
    abstract signIn(credential: Credential): Observable<SignInResponse>;
    abstract assignTaskToSprint(ids: SprintTaskIds): Observable<DefaultResponse>;
    abstract assignUser(ids: UserProjectIds): Observable<DefaultResponse>;
    abstract createProject(project: Project): Observable<DefaultResponse>;
    abstract createSprint(sprint: Sprint): Observable<DefaultResponse>;
    abstract createSprintSchedule(sprintId: SprintId): Observable<DefaultResponse>;
    abstract createTask(task: Task): Observable<DefaultResponse>;
    abstract editProject(project: Project): Observable<DefaultResponse>;
    abstract editSprint(sprint: Sprint): Observable<DefaultResponse>;
    abstract editTask(task: Task): Observable<Task>;
    abstract getProjectBacklogTasks(ids: SprintProjectIds): Observable<Task[]>;
    abstract getTasksByProject(projectId: ProjectId): Observable<Task[]>;
    abstract getTasksBySprint(sprintId: SprintId): Observable<Task[]>;
    abstract projectsByUser(userId: UserId): Observable<Project[]>;
    abstract registerUser(credential: Credential): Observable<DefaultResponse>;
    abstract sprintById(sprintId: SprintId): Observable<Sprint>;
    abstract sprintGanChart(sprintId: SprintId): Observable<GanChartInfo>;
    abstract status(): Observable<DefaultResponse>;
    abstract unassignUser(ids: UserProjectIds): Observable<DefaultResponse>;
    abstract usersByProject(projectId: ProjectId): Observable<User[]>;
    // TODO: check returnType
    abstract usersNotInProject(projectId: ProjectId): Observable<{userId: number}[]>;
}
