import {CookieService} from 'ngx-cookie-service';
import {USER_ID_NAME} from './models/app.consts';
import {Router} from '@angular/router';

export function appBootstrap(cookieService: CookieService,
                             router: Router) {
    return () => new Promise(resolve => {
        if (!cookieService.check(USER_ID_NAME)) {
            console.log('Redirect to login');
            router.navigate(['auth']);
        }
        resolve();
    });
}
