import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, take, takeUntil } from 'rxjs';
import { Account, Week } from '../../../common/view';
import { BrokerService } from '../../../common/broker.service';
import { TemplateService } from '../../../common/template.service';
import {RecordsService} from "../../../common/records.service";
import {DateSelectorService} from "../../../common/date-selector.service";
import {DateHelper} from "../../../common/date.helper";

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
    private readonly recordsService: RecordsService,
    private readonly broker: BrokerService,
    private readonly dateSelector: DateSelectorService
  ) {}

  ngOnInit(): void {
    this.broker.get$<Date>('date').subscribe((date) => {
      this.test(date);
    });

    this.listTemplates();

    this.recordsService.get().subscribe((accounts) => {
      this.accounts = accounts;
    });
  }

  public remove(account: Account) {
    this.accounts = this.accounts.filter((a) => a !== account);
  }

  public new() {
    this.accounts = [...this.accounts, { id: '', code: '', times: [] }];
  }

  public save() {
    this.http.post('/api/records', this.accounts).pipe(take(1)).subscribe();
  }

  public send() {
    // TODO: Should send to driver
    this.http.post('/api/driver', this.accounts).pipe(take(1)).subscribe();
  }

  private test(date: Date) {
    const firstDayOfWeek = DateHelper.getFirstDayOfWeek(date);

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
    // TODO: Load previous records and add spinner
    this.dateSelector.previousWeek();
    this.loadRecords();
  }

  nextWeek() {
    this.dateSelector.nextWeek();
    // TODO: Load next records and add spinner
    this.loadRecords();
  }

  private loadRecords() {
    this.recordsService.get().pipe(take(1)).subscribe((accounts) => { this.accounts = accounts; });
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
