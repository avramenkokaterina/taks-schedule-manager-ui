import {User} from './user.model';

export interface AppConfig {
    users: User[];
}

export class AppConfigRef {
    public ref: AppConfig;
}
