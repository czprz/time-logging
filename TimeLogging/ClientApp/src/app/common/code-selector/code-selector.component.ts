import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FilterService } from 'primeng/api';
import { CodesServiceService } from '../codes-service.service';

@Component({
  selector: 'app-code-selector',
  templateUrl: './code-selector.component.html',
  styleUrls: ['./code-selector.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CodeSelectorComponent implements OnInit, OnDestroy {
  @Input()
  public code: string | null = null;

  @Output()
  public codeChange = new EventEmitter<string>();

  public week: Date = new Date();
  public codes: AutoCodeGroup[] = [];
  public filteredCodes: AutoCodeGroup[] = [];
  public selected: AutoCode | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly codesService: CodesServiceService,
    private readonly elementRef: ElementRef,
    private readonly filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.codesService
      .getCodes()
      .pipe(takeUntil(this.destroy$))
      .subscribe((codes) => {
        if (codes == null) {
          return;
        }

        this.selected =
          codes
            .find((x) => x.items.find((y) => y.value == this.code))
            ?.items.find((y) => y.value == this.code) ?? null;

        this.codes = codes!;
        this.filteredCodes = codes!;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public filterCodes(event: any) {
    let query = event.query;
    let filtered: AutoCodeGroup[] = [];

    for (let optGroup of this.codes) {
      let filteredSubOptions = this.filterService.filter(
        optGroup.items,
        ['label'],
        query,
        'contains'
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filtered.push({
          label: optGroup.label,
          value: optGroup.value,
          items: filteredSubOptions,
        });
      }
    }

    this.filteredCodes = filtered;
  }

  onSelectCode($event: any) {
    this.codeChange.emit($event.value);
  }
}

export interface AutoCode {
  label: string;
  value: string;
}

export interface AutoCodeGroup {
  label: string;
  value: string;
  items: AutoCode[];
}

export interface Code {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
}
