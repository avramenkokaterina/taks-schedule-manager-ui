import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'tsm-widget',
    templateUrl: './widget.component.html',
    styleUrls: ['./widget.component.less']
})
export class WidgetComponent implements OnInit {

    @Input()
    iconId: string;

    @Input()
    color: string;

    @Input()
    currentCount: number;

    @Input()
    totalCount: number;

    @Input()
    label: string;

    @Input()
    name: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}
