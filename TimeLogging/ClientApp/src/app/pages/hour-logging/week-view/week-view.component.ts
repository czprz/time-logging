import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { Account, Week } from '../../../common/view';
import { BrokerService } from '../../../common/broker.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss'],
})
export class WeekViewComponent implements OnInit {
  public accounts: Account[] = [];
  public week: Week | null = null;
  public options = [
    {
      label: 'New',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        this.new();
      },
    },
    {
      label: 'Save',
      icon: 'pi pi-save',
      command: () => {
        this.save();
      },
    },
    {
      label: 'Send',
      icon: 'pi pi-send',
      command: () => {
        this.send();
      },
    },
  ];

  constructor(
    private readonly http: HttpClient,
    private readonly broker: BrokerService
  ) {}

  ngOnInit(): void {
    this.broker.get<Date>('date').subscribe((date) => {
      this.test(date);
    });
    this.http
      .get<Account[]>('/api/tracking')
      .pipe(take(1))
      // TODO: Query for the selected week
      .subscribe((accounts) => (this.accounts = accounts));
  }

  remove(account: Account) {
    this.accounts = this.accounts.filter((a) => a !== account);
  }

  new() {
    this.accounts = [...this.accounts, { id: '', code: '', times: [] }];
  }

  save() {
    this.http.post('/api/tracking', this.accounts).pipe(take(1)).subscribe();
  }

  send() {
    // TODO: Should send to driver
    this.http
      .post('/api/tracking/send', this.accounts)
      .pipe(take(1))
      .subscribe();
  }

  private test(date: Date) {
    console.log(date);
    const weekNo = this.getWeekNumber(date);
    const firstDayOfWeek = new Date(
      date.getFullYear(),
      0,
      1 + (weekNo - 1) * 7
    );
    const dayOfWeek = firstDayOfWeek.getDay();

    const startDate = firstDayOfWeek;
    if (dayOfWeek !== 0) {
      startDate.setDate(firstDayOfWeek.getDate() + (7 - dayOfWeek));
    }

    const week: Week = {
      monday: null,
      tuesday: null,
      wednesday: null,
      thursday: null,
      friday: null,
      saturday: null,
      sunday: null,
    };

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      switch (i) {
        case 0:
          week.monday = date;
          break;
        case 1:
          week.tuesday = date;
          break;
        case 2:
          week.wednesday = date;
          break;
        case 3:
          week.thursday = date;
          break;
        case 4:
          week.friday = date;
          break;
        case 5:
          week.saturday = date;
          break;
        case 6:
          week.sunday = date;
          break;
      }
    }

    this.week = week;
  }

  previousWeek() {
    this.broker.set('previousWeek', true);
  }

  nextWeek() {
    this.broker.set('nextWeek', true);
  }

  private getWeekNumber(date: Date): number {
    date = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // @ts-ignore
    const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }
}
