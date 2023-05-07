import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { BrokerService } from '../../common/broker.service';
import { Subject, takeUntil } from 'rxjs';
import {Calendar} from "primeng/calendar";

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
      disabled: true
    },
    {
      name: 'Week',
      code: 'week',
    },
    {
      name: 'Month',
      code: 'month',
      disabled: true
    },
  ];
  public selectedCalendarView = { name: 'Week', code: 'week' };
  public date = new Date();

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly broker: BrokerService) {
    this.onCalendarDateChange(this.date);
  }

  ngAfterViewInit(): void {
    this.broker
      .get('nextWeek')
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.date = this.getNextMonday(this.date);
        this.calendar.updateInputfield();
        this.onCalendarDateChange(this.date);
      });

    this.broker.get('previousWeek')
      .pipe(takeUntil(this.destroy$))
      .subscribe((_) => {
        this.date = this.getPreviousMonday(this.date);
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

  private getNextMonday(date: Date) {
    const daysUntilMonday = (8 - date.getDay()) % 7;
    if (daysUntilMonday === 0) {
      date.setDate(this.date.getDate() + 7);
      return date;
    }

    date.setDate(this.date.getDate() + daysUntilMonday);
    return date;
  }

  private getPreviousMonday(date: Date) {
    const daysUntilMonday = (8 - date.getDay()) % 7;
    if (daysUntilMonday === 0) {
      date.setDate(this.date.getDate() - 7);
      return date;
    }

    date.setDate(this.date.getDate() - daysUntilMonday);
    return date;
  }
}
