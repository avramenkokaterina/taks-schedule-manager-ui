import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectHeaderComponent} from './project-header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@NgModule({
    declarations: [ProjectHeaderComponent],
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports: [ProjectHeaderComponent]
})
export class ProjectHeaderModule {
}
