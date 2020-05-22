import {Component, Input, OnInit, Output} from '@angular/core';
import {ParametersPanelModel} from './parameters-panel.model';

@Component({
    selector: 'tsm-parameters-panel',
    templateUrl: './parameters-panel.component.html',
    styleUrls: ['./parameters-panel.component.less']
})
export class ParametersPanelComponent implements OnInit {

    @Input()
    model: ParametersPanelModel[] = [];

    @Input()
    header: string = '';

    constructor() {
    }

    ngOnInit(): void {
    }

}
