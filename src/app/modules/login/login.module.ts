import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TSMLoginComponent} from './login.component';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: TSMLoginComponent
    }
];

@NgModule({
    declarations: [TSMLoginComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule
    ]
})
export class TSMLoginModule {
}
