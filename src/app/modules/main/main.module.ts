import {NgModule} from '@angular/core';
import {TSMProjectsComponent} from './components/projects/projects.component';
import {TSMMainComponent} from './main.component';
import {RouterTabsModule} from '../../components/router-tabs/router-tabs.module';
import {TMSMainRoutingModule} from './main-routing.module';
import {ParametersPanelModule} from '../../components/parameters-panel/parameters-panel.module';
import {ProjectCardComponent} from './components/projects/components/project-card/project-card.component';
import {CommonModule} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ProjectEditComponent} from './components/projects/components/project-edit/project-edit.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        TSMProjectsComponent,
        TSMMainComponent,
        ProjectCardComponent,
        ProjectEditComponent
    ],
    imports: [
        RouterTabsModule,
        TMSMainRoutingModule,
        ParametersPanelModule,
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        ReactiveFormsModule
    ]
})
export class MainModule {

}
