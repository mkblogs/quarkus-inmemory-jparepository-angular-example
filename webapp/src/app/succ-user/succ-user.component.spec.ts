import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccUserComponent } from './succ-user.component';

describe('SuccUserComponent', () => {
  let component: SuccUserComponent;
  let fixture: ComponentFixture<SuccUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
