import { Component } from '@angular/core';
import { BrokerService } from '../../common/broker.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  public calendarViews = [
    {
      name: 'Day',
      code: 'day',
    },
    {
      name: 'Week',
      code: 'week',
    },
    {
      name: 'Month',
      code: 'month',
    },
  ];
  public selectedCalendarView = { name: 'Week', code: 'week' };

  constructor(private readonly broker: BrokerService) {}

  public changeTheme(theme: string): void {
    this.broker.set('theme', theme);
  }

  public onCalendarViewChange($event: any) {
    this.broker.set('calendarView', $event.value.code);
  }

  public onCalendarDateChange($event: any) {
    // TODO: Get the date range from the calendar and set it in the broker
    this.broker.set('fromDate', $event.value);
    this.broker.set('toDate', $event.value);
  }
}
