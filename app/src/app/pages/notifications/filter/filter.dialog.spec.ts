import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterNotificationsDialog } from './filter.dialog';

describe('FilterNotificationsDialog', () => {
  let component: FilterNotificationsDialog;
  let fixture: ComponentFixture<FilterNotificationsDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterNotificationsDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterNotificationsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
