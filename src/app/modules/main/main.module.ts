import {NgModule} from '@angular/core';
import {TSMMainComponent} from './main.component';
import {RouterTabsModule} from '../../components/router-tabs/router-tabs.module';
import {TMSMainRoutingModule} from './main-routing.module';
import {CommonModule} from '@angular/common';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {USER_ID_NAME} from '../../models/app.consts';
import {AppService} from '../../state/app/app.service';

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
    constructor(private router: Router,
                private appService: AppService,
                private cookieService: CookieService) {
        if (!cookieService.check(USER_ID_NAME)) {
            console.log('Redirect to login');
            router.navigate(['auth']);
        } else {
            appService.setUserId(parseInt(cookieService.get(USER_ID_NAME), 10));
        }
    }
}
