import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TSMMainComponent } from './main.component';

describe('MainComponent', () => {
  let component: TSMMainComponent;
  let fixture: ComponentFixture<TSMMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSMMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSMMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
