import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccountCreationRoutingModule} from './account-creation-routing.module';
import {AccountCreationComponent} from './account-creation.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {ColorPickerModule} from 'ngx-color-picker';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations: [AccountCreationComponent],
    imports: [
        CommonModule,
        AccountCreationRoutingModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        ColorPickerModule,
        MatSelectModule
    ]
})
export class AccountCreationModule {
}
