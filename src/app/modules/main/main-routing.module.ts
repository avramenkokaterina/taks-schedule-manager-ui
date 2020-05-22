import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {NgModule} from '@angular/core';
import {TSMMainComponent} from './main.component';
import {TSMProjectsComponent} from './components/projects/projects.component';

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
                path: 'projects',
                component: TSMProjectsComponent
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
