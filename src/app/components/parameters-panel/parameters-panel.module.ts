import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParametersPanelComponent} from './parameters-panel.component';


@NgModule({
    declarations: [ParametersPanelComponent],
    imports: [
        CommonModule
    ],
    exports: [ParametersPanelComponent]
})
export class ParametersPanelModule {
}
