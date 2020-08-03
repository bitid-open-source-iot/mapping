import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSelectDialog } from './select.dialog';

describe('GroupSelectDialog', () => {
  let component: GroupSelectDialog;
  let fixture: ComponentFixture<GroupSelectDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSelectDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSelectDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
