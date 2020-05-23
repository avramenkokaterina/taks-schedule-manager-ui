import {NgModule} from '@angular/core';
import {TSMMainComponent} from './main.component';
import {RouterTabsModule} from '../../components/router-tabs/router-tabs.module';
import {TMSMainRoutingModule} from './main-routing.module';
import {CommonModule} from '@angular/common';

@NgModule({
    declarations: [
        TSMMainComponent,
    ],
    imports: [
        RouterTabsModule,
        TMSMainRoutingModule,
        CommonModule
    ]
})
export class MainModule {

}
