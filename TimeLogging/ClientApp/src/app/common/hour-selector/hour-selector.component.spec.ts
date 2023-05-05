import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourSelectorComponent } from './hour-selector.component';

describe('AppHourSelectorComponent', () => {
  let component: HourSelectorComponent;
  let fixture: ComponentFixture<HourSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
