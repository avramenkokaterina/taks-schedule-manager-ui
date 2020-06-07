import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SprintWidgetsComponent} from './sprint-widgets.component';
import {WidgetModule} from '../../components/widget/widget.module';


@NgModule({
    declarations: [SprintWidgetsComponent],
    imports: [
        CommonModule,
        WidgetModule
    ],
    exports: [SprintWidgetsComponent]
})
export class SprintWidgetsModule {
}
