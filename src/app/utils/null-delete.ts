export function nullDelete<T extends object>(arg: T): T {
    const result = {...arg};
    for (let key of Object.keys(arg)) {
        arg[key] ?? (delete result[key]);
    }
    return result;
}
