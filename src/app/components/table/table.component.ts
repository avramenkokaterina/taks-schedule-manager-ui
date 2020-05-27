import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TableModel} from './table.model';

@Component({
    selector: 'tsm-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.less']
})
export class TableComponent implements OnChanges {

    @Input()
    model: TableModel;

    @Output()
    itemsSelect = new EventEmitter<number[]>();

    @Output()
    itemsUnselect = new EventEmitter<number[]>();

    private selectedCount = 0;

    constructor() {
        window['aaa'] = this;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.selectedCount = this.model.rows.reduce((result, next) => {
            next.selected && result++;
            return result;
        }, 0);
        this.selectHeaderIfAllSelected();
    }

    _selectAll(value: boolean) {
        if (value) {
            this.itemsSelect.emit(this.model.rows.map(row => row.id));
            this.selectedCount = this.model.rows.length;
        } else {
            this.itemsUnselect.emit(this.model.rows.map(row => row.id));
            this.selectedCount = 0;
        }


        this.model = {
            ...this.model,
            header: {
                ...this.model.header,
                selected: value
            },
            rows: this.model.rows.map(row => ({...row, selected: value}))
        };
    }

    _selectedChange(rowId: number, value: boolean): void {
        if (value) {
            this.itemsSelect.emit([rowId]);
        } else {
            this.itemsUnselect.emit([rowId]);
        }

        this.model = {
            ...this.model,
            rows: this.model.rows.map(row => {
                if (row.id === rowId) {
                    return {
                        ...row,
                        selected: value
                    };
                } else {
                    return row;
                }
            })
        };

        this.changeSelected(value);
    }

    private changeSelected(value: boolean): void {
        if (value) {
            this.selectedCount++;
            this.selectHeaderIfAllSelected();
        } else {
            this.selectedCount--;
            this.setSelectedForHeader(false);
        }
    }

    private setSelectedForHeader(value: boolean): void {
        this.model = {
            ...this.model,
            header: {
                ...this.model.header,
                selected: value
            }
        };
    }

    private selectHeaderIfAllSelected(): void {
        if (this.selectedCount === this.model.rows.length) {
            this.setSelectedForHeader(true);
        } else {
            this.setSelectedForHeader(false);
        }
    }

}
