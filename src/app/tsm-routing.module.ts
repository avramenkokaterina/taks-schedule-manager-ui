import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/login/login.module').then(m => m.TSMLoginModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class TMSRoutingModule {
}
