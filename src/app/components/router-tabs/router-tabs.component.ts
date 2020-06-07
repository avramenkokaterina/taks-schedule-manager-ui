import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {RouterTabItem} from './router-tabs.types';

@Component({
    selector: 'tsm-router-tabs',
    templateUrl: './router-tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouterTabsComponent {

    @Input() itemsTop: RouterTabItem[];

    @Input() itemsBottom: RouterTabItem[];

    @Output() valueChange: EventEmitter<RouterTabItem>;

    @HostBinding('class') private classes = 'router-tabs';

    constructor() {
    }

}
