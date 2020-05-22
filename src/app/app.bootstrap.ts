import {CookieService} from 'ngx-cookie-service';
import {USER_ID_NAME} from './models/app.consts';
import {Router} from '@angular/router';
import {AppService} from './state/app/app.service';

export function appBootstrap(cookieService: CookieService,
                             router: Router,
                             appService: AppService) {
    return () => new Promise(resolve => {
        if (!cookieService.check(USER_ID_NAME)) {
            console.log('Redirect to login');
            router.navigate(['auth']);
        } else {
            appService.setUserId(parseInt(cookieService.get(USER_ID_NAME), 10))
        }
        resolve();
    });
}
