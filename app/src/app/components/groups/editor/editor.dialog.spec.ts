import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupEditorDialog } from './editor.dialog';

describe('GroupEditorDialog', () => {
  let component: GroupEditorDialog;
  let fixture: ComponentFixture<GroupEditorDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupEditorDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupEditorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
