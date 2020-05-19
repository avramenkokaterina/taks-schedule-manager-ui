export interface AppState {
    userId: number;
}

export function createInitialState(): AppState {
    return {
        userId: null
    };
}
