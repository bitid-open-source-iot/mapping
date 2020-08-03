import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModal } from './device.modal';

describe('DeviceModal', () => {
  let component: DeviceModal;
  let fixture: ComponentFixture<DeviceModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
