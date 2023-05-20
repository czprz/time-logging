import {
  Component,
  ElementRef,
  Input, OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject, takeUntil, zip} from 'rxjs';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-code-selector',
  templateUrl: './code-selector.component.html',
  styleUrls: ['./code-selector.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class CodeSelectorComponent implements OnInit, OnDestroy {
  @Input()
  public code: AutoCode | null = null;

  public week: Date = new Date();
  public codes: AutoCodeGroup[] = [];
  public filteredCodes: AutoCodeGroup[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    private readonly elementRef: ElementRef,
    private readonly filterService: FilterService
  ) {}

  ngOnInit(): void {
    const products$ = this.http.get<Product[]>('/api/products').pipe(takeUntil(this.destroy$));
    const codes$ = this.http.get<Code[]>('/api/codes').pipe(takeUntil(this.destroy$));

    zip<[Product[], Code[]]>(products$, codes$).pipe(takeUntil(this.destroy$)).subscribe(([products, codes]) => {
      this.codes = this.map(products, codes)
      this.filteredCodes = this.codes;
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

  private map(products: Product[], codes: Code[]) {
    return products.map((product) => {
      return {
        label: product.name,
        value: product.id,
        items: codes.map((code) => {
          return {
            label: `${product.name} - ${code.name}`,
            value: code.id,
          };
        }),
      };
    });
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
