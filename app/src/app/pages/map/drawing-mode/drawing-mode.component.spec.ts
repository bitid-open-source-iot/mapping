import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawingModeComponent } from './drawing-mode.component';

describe('DrawingModeComponent', () => {
  let component: DrawingModeComponent;
  let fixture: ComponentFixture<DrawingModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrawingModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
