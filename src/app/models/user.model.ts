export interface User {
    readonly id?: number;
    readonly fullName: string;
    readonly password?: string;
    readonly color?: string;
    readonly email: string;
    readonly position?: string;
}
