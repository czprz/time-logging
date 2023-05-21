import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { BrokerService } from '../../common/broker.service';
import { Subject, takeUntil } from 'rxjs';
import { Calendar } from 'primeng/calendar';

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
  public date$ = this.broker.get$<Date>('date');

  private readonly destroy$ = new Subject<void>();

  constructor(private readonly broker: BrokerService) {
    this.broker.set('calendarView', 'week');
  }

  ngAfterViewInit(): void {
    this.broker
      .get$<Date>('date')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calendar.updateInputfield();
      });
  }

  public changeTheme(theme: string): void {
    this.broker.set('theme', theme);
  }

  public onCalendarViewChange($event: any) {
    this.broker.set('calendarView', $event.value.code);
  }

  public onCalendarDateChange($event: any) {
    this.broker.set('calendar-change', $event);
  }
}
