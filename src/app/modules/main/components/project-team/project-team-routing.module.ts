import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectTeamComponent} from './project-team.component';


const routes: Routes = [
    {
        path: '',
        component: ProjectTeamComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectTeamRoutingModule {
}
