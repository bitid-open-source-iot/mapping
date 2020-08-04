import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryModal } from './query.modal';

describe('QueryModal', () => {
  let component: QueryModal;
  let fixture: ComponentFixture<QueryModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
