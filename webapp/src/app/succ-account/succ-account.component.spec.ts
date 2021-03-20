import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccAccountComponent } from './succ-account.component';

describe('SuccAccountComponent', () => {
  let component: SuccAccountComponent;
  let fixture: ComponentFixture<SuccAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
