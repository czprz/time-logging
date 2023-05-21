import { Injectable } from '@angular/core';
import { DateHelper } from './date.helper';
import { BrokerService } from './broker.service';

@Injectable({
  providedIn: 'root',
})
export class DateSelectorService {
  constructor(private readonly broker: BrokerService) {
    const now = new Date();
    const currentDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    );
    this.broker.set('date', currentDate);

    this.broker.get$<Date>('calendar-change').subscribe((date) => {
      if (date === null) {
        return;
      }

      this.broker.set('date', date);
    });
  }

  public nextWeek(): void {
    const currentDate = this.broker.get<Date>('date');
    const newDate = DateHelper.nextWeek(currentDate);

    this.broker.set('date', newDate);
  }

  public previousWeek(): void {
    const currentDate = this.broker.get<Date>('date');
    const newDate = DateHelper.previousWeek(currentDate);

    this.broker.set('date', newDate);
  }
}
