import {Store, StoreConfig} from '@datorama/akita';
import {AppState, createInitialState} from './app.state';
import {Injectable} from '@angular/core';

@Injectable()
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
    constructor() {
        super(createInitialState());
    }
}
