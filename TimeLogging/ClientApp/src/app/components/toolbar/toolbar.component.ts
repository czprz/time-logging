import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BrokerService } from '../../common/broker.service';
import { Subject, takeUntil } from 'rxjs';
import { Calendar } from 'primeng/calendar';
import {DateHelper} from "../../common/date.helper";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild('calendar') public readonly calendar!: Calendar;

  public calendarViews = [
    {
      name: 'Day',
      code: 'day',
      disabled: true,
    },
    {
      name: 'Week',
      code: 'week',
    },
    {
      name: 'Month',
      code: 'month',
      disabled: true,
    },
  ];
  public selectedCalendarView = { name: 'Week', code: 'week' };
  // TODO: Remove hours, minutes, seconds from date
  public date = new Date();

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly broker: BrokerService) {
    this.onCalendarDateChange(this.date);
    this.broker.set('calendarView', 'week');
  }

  ngAfterViewInit(): void {
    this.broker
      .get$('nextWeek')
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.date = DateHelper.getNextMonday(this.date);
        this.calendar.updateInputfield();
        this.onCalendarDateChange(this.date);
      });

    this.broker
      .get$('previousWeek')
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.date = DateHelper.getPreviousMonday(this.date);
        this.calendar.updateInputfield();
        this.onCalendarDateChange(this.date);
      });
  }

  public changeTheme(theme: string): void {
    this.broker.set('theme', theme);
  }

  public onCalendarViewChange($event: any) {
    this.broker.set('calendarView', $event.value.code);
  }

  public onCalendarDateChange($event: any) {
    this.broker.set('date', $event);
  }
}
