import {Component} from '@angular/core';
import {RouterTabItem} from '../../components/router-tabs/router-tabs.types';

@Component({
    selector: 'tsm-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class TSMMainComponent {

    _tabItems: RouterTabItem[] = [
        {
            id: 'projects',
            link: 'projects',
            iconName: 'squares'
        },
        {
            id: 'people',
            link: 'people',
            iconName: 'people'
        }
    ];

    constructor() {
    }

}
