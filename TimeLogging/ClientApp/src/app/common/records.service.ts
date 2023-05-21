import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './view';
import { BrokerService } from './broker.service';
import { DateHelper } from './date.helper';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  constructor(
    private readonly http: HttpClient,
    private readonly broker: BrokerService
  ) {}

  public get() {
    const dates = this.dateSelection();
    return this.http.get<Account[]>(
      `/api/records?from=${dates.from.toISOString()}&to=${dates.to.toISOString()}`
    );
  }

  public save(Accounts: Account[]) {
    return this.http.post('/api/records', Accounts);
  }

  private dateSelection() {
    const calendarView = this.broker.get<string>('calendarView');
    const date = this.broker.get<Date>('date');

    switch (calendarView) {
      case 'month':
        return { from: date, to: date };
      case 'week':
        return { from: DateHelper.getFirstDayOfWeek(date), to: DateHelper.getLastDayOfWeek(date) };
      case 'day':
        return { from: date, to: date };
      default:
        throw new Error('Not supported calendar view');
    }
  }
}
