import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TSMProjectsComponent} from './projects.component';


const routes: Routes = [{
    path: '',
    component: TSMProjectsComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {
}
