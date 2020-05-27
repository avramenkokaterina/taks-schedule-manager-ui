export type TableColumn = Readonly<{
    value: string;
    styleClass?: string;
}>;

export type TableRow = Readonly<{
    columns: TableColumn[],
    id?: number
    selected?: boolean;
    styleClass?: string;
}>;

export type TableModel = Readonly<{
    header: TableRow,
    rows: TableRow[]
}>;
