import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTabsModule} from './components/router-tabs/router-tabs.module';
import {TMSRoutingModule} from './tsm-routing.module';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {appBootstrap} from './app.bootstrap';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AppService} from './state/app/app.service';
import {AppQuery} from './state/app/app.query';
import {AppStore} from './state/app/app.store';
import {HttpService} from './services/http/http.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TMSRoutingModule,
        RouterTabsModule,
        HttpClientModule
    ],
    providers: [
        AppService,
        AppQuery,
        AppStore,
        HttpService,
        {
            provide: APP_INITIALIZER,
            useFactory: appBootstrap,
            deps: [
                CookieService,
                Router
            ],
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
