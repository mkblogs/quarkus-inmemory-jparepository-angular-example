import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallaccountsComponent } from './getallaccounts.component';

describe('GetallaccountsComponent', () => {
  let component: GetallaccountsComponent;
  let fixture: ComponentFixture<GetallaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetallaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
