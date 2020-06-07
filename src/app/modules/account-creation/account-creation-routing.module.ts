import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccountCreationComponent} from './account-creation.component';


const routes: Routes = [
    {
        path: '',
        component: AccountCreationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountCreationRoutingModule {
}
