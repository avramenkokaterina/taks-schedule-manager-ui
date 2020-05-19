import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterTabsComponent} from './router-tabs.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [RouterTabsComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        RouterTabsComponent
    ]
})
export class RouterTabsModule {
}
