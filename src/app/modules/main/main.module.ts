import {NgModule} from '@angular/core';
import {TSMProjectsComponent} from './components/projects/projects.component';
import {TSMMainComponent} from './main.component';
import {RouterTabsModule} from '../../components/router-tabs/router-tabs.module';
import {TMSMainRoutingModule} from './main-routing.module';

@NgModule({
    declarations: [TSMProjectsComponent, TSMMainComponent],
    imports: [
        RouterTabsModule,
        TMSMainRoutingModule
    ]
})
export class MainModule {

}
