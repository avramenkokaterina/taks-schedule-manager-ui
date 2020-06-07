import {HttpServiceType} from '../../models/http.types';
import {Observable} from 'rxjs';
import {SignInResponse} from '../../models/auth.types';
import {
    DefaultResponse,
    GanChartInfo,
    Project,
    ProjectId,
    ResponseWIthSprint,
    Sprint,
    SprintId,
    SprintProjectIds,
    SprintTaskIds,
    Task,
    UserId,
    UserProjectIds,
    UsersProjectIds
} from '../../models/entity.model';
import {User} from '../../models/user.model';

export abstract class HttpAbstractService implements HttpServiceType {
    // TODO: wrong interface
    abstract signIn(credential: Credential): Observable<SignInResponse>;
    abstract assignTaskToSprint(ids: SprintTaskIds): Observable<DefaultResponse>;
    abstract assignUser(ids: UsersProjectIds): Observable<DefaultResponse>;
    abstract createProject(project: Project): Observable<DefaultResponse>;
    abstract createSprint(sprint: Sprint): Observable<ResponseWIthSprint>;
    abstract createSprintSchedule(sprintId: SprintId): Observable<DefaultResponse>;
    abstract createTask(task: Task): Observable<DefaultResponse>;
    abstract editProject(project: Project): Observable<DefaultResponse>;
    abstract editSprint(sprint: Sprint): Observable<DefaultResponse>;
    abstract editTask(task: Task): Observable<Task>;
    abstract deleteTasks(ids: {taskIds: number[]}): Observable<DefaultResponse>;
    abstract deleteProject(projectId: ProjectId): Observable<DefaultResponse>;
    abstract getProjectBacklogTasks(ids: SprintProjectIds): Observable<Task[]>;
    abstract getTasksByProject(projectId: ProjectId): Observable<Task[]>;
    abstract getTasksBySprint(sprintId: SprintId): Observable<Task[]>;
    abstract projectsByUser(userId: UserId): Observable<Project[]>;
    abstract registerUser(user: User): Observable<DefaultResponse>;
    abstract sprintById(sprintId: SprintId): Observable<Sprint>;
    abstract sprintGanChart(sprintId: SprintId): Observable<GanChartInfo[]>;
    abstract status(): Observable<DefaultResponse>;
    abstract unassignUser(ids: UserProjectIds): Observable<DefaultResponse>;
    abstract usersByProject(projectId: ProjectId): Observable<User[]>;
    // TODO: check returnType
    abstract usersNotInProject(projectId: ProjectId): Observable<User[]>;
    abstract endSprint(sprintId: SprintId): Observable<DefaultResponse>;
    abstract signOut(): Observable<DefaultResponse>;
}
