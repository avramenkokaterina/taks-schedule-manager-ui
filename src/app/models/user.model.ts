export interface User {
    readonly id: string;
    readonly fullName: string;
    readonly password?: string;
    readonly color?: string;
    readonly email?: string;
    readonly position?: string;
}
