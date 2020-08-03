import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceZonesComponent } from './zones.component';

describe('DeviceZonesComponent', () => {
  let component: DeviceZonesComponent;
  let fixture: ComponentFixture<DeviceZonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceZonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
