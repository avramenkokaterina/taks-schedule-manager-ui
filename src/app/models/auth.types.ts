import {USER_ID_NAME} from './app.consts';

export interface SignInResponse {
    result: string;
    [USER_ID_NAME]: number;
}

export interface Credential {
    readonly login: string;
    readonly password: string;
    readonly fullName?: string;
}
