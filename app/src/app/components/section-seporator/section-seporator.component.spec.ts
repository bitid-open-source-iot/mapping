import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSeporatorComponent } from './section-seporator.component';

describe('SectionSeporatorComponent', () => {
  let component: SectionSeporatorComponent;
  let fixture: ComponentFixture<SectionSeporatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionSeporatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionSeporatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
