import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TSMProjectsComponent} from './projects.component';

describe('ProjectsComponent', () => {
    let component: TSMProjectsComponent;
    let fixture: ComponentFixture<TSMProjectsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TSMProjectsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TSMProjectsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
