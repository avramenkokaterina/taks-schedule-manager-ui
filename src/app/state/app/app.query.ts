import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {AppState} from './app.state';
import {AppStore} from './app.store';

@Injectable({providedIn: 'root'})
export class AppQuery extends Query<AppState>{
    constructor(protected store: AppStore) {
        super(store);
    }

    public get userId(): number {
        return this.store.getValue().userId;
    }
}
