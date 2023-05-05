import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourLoggingComponent } from './hour-logging.component';

describe('HourLoggingComponent', () => {
  let component: HourLoggingComponent;
  let fixture: ComponentFixture<HourLoggingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourLoggingComponent]
    });
    fixture = TestBed.createComponent(HourLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
