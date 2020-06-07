import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {TSMMainComponent} from './main.component';

const routes: Routes = [
    {
        path: '',
        component: TSMMainComponent,
        children: [
            {
                path: '',
                redirectTo: 'projects',
                pathMatch: 'full'
            },
            {
                path: 'gan-chart',
                loadChildren: () => import('./modules/gan-chart/gan-chart.module').then(value => value.GanChartModule)
            },
            {
                path: 'projects',
                loadChildren: () => import('./modules/projects/projects.module').then(value => value.ProjectsModule)
            },
            {
                path: 'kanban',
                loadChildren: () => import('./modules/kanban/kanban.module').then(value => value.KanbanModule)
            },
            {
                path: 'project-team',
                loadChildren: () => import('./modules/project-team/project-team.module').then(value => value.ProjectTeamModule)
            },
            {
                path: 'statistic',
                loadChildren: () => import('./modules/statistic/statistic.module').then(value => value.StatisticModule)
            },
            {
                path: 'tasks',
                loadChildren: () => import('./modules/tasks/tasks.module').then(value => value.TasksModule)
            },
            {
                path: '**',
                component: PageNotFoundComponent
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TMSMainRoutingModule {
}
