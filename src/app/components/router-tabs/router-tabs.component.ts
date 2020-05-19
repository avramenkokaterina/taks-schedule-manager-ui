import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import {RouterTabItem} from './router-tabs.types';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'tsm-router-tabs',
    templateUrl: './router-tabs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouterTabsComponent implements OnChanges, OnInit {

    @Input() items: RouterTabItem[];
    @Input() value: RouterTabItem;

    @Output() valueChange: EventEmitter<RouterTabItem>;

    _selectedItem: RouterTabItem;

    @HostBinding('class') private classes = 'router-tabs';

    constructor(private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.value) {
            const currentValue: RouterTabItem = changes.value.currentValue;
            if (currentValue && currentValue.link) {
                this._selectedItem = currentValue;
                this.router.navigate([currentValue.link], {relativeTo: this.route});
            }
        }
    }

    ngOnInit(): void {
    }

    _selectItem(item: RouterTabItem): void {
        this._selectedItem = item;
        this.router.navigate([item.link], {relativeTo: this.route});
    }

}
