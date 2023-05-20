import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, take, takeUntil } from 'rxjs';
import { Account, Week } from '../../../common/view';
import { BrokerService } from '../../../common/broker.service';
import { TemplateService } from '../../../common/template.service';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.scss'],
})
export class WeekViewComponent implements OnInit {
  public accounts: Account[] = [];
  public week: Week | null = null;
  public lastTemplate = this.templateService.lastTemplate;
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
  public selectButtonOptions = [
    { label: '5 Day', value: 2 },
    { label: '7 Day', value: 1 },
  ];
  public selectButtonValue = 2;
  public templateOptions = [
    {
      label: 'Save Template',
      icon: 'pi pi-save',
      command: () => {
        this.saveTemplate();
      },
    },
    {
      separator: true,
    },
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly templateService: TemplateService,
    private readonly broker: BrokerService
  ) {}

  ngOnInit(): void {
    this.broker.get<Date>('date').subscribe((date) => {
      this.test(date);
    });

    this.listTemplates();

    this.http
      .get<Account[]>('/api/records')
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
    this.http.post('/api/driver', this.accounts).pipe(take(1)).subscribe();
  }

  private test(date: Date) {
    const dayOfWeek = date.getDay();

    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(
      date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    );

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
      const date = new Date(firstDayOfWeek);
      date.setDate(firstDayOfWeek.getDate() + i);

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

  private saveTemplate() {
    this.templateService.saveTemplate(this.accounts);
  }

  public listTemplates() {
    this.templateService
      .getTemplates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((templates) => {
        for (const template of templates) {
          this.templateOptions.push({
            label: template.name,
            icon: 'pi pi-download',
            command: () => {
              this.loadTemplate(template.id);
            },
          });
        }
      });
  }

  public loadTemplate(id: string) {
    return this.templateService.getTemplateItems(id);
  }
}
