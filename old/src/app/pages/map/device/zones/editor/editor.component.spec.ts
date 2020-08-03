import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceZoneEditorComponent } from './editor.component';

describe('DeviceZoneEditorComponent', () => {
  let component: DeviceZoneEditorComponent;
  let fixture: ComponentFixture<DeviceZoneEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceZoneEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceZoneEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
