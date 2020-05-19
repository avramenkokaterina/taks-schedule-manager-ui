import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TSMLoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: TSMLoginComponent;
  let fixture: ComponentFixture<TSMLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TSMLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TSMLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
