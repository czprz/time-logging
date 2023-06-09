import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from './view';
import { BrokerService } from './broker.service';
import { DateHelper } from './date.helper';
import {map} from "rxjs";

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
    return this.http.get<Record[]>(
      `/api/records?from=${dates.from.toISOString()}&to=${dates.to.toISOString()}`
    ).pipe(map((records) => this.mapRecords(records)));
  }

  public save(Accounts: Record[]) {
    return this.http.post('/api/records', Accounts);
  }

  private dateSelection() {
    const calendarView = this.broker.get<string>('calendarView');
    const date = this.broker.get<Date>('date');

    switch (calendarView) {
      case 'month':
        return { from: date, to: date };
      case 'week':
        return {
          from: DateHelper.getFirstDayOfWeek(date),
          to: DateHelper.getLastDayOfWeek(date),
        };
      case 'day':
        return { from: date, to: date };
      default:
        throw new Error('Not supported calendar view');
    }
  }

  private mapRecords(records: Record[]) {
    return records.map((record) => {
      const date = new Date(record.date);
      return {
        ...record,
        date,
        hours: record.hours,
        minutes: record.minutes,
        seconds: record.seconds,
      };
    });
  }
}
