import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-code-selector',
  templateUrl: './code-selector.component.html',
  styleUrls: ['./code-selector.component.scss'],
})
export class CodeSelectorComponent implements OnInit {
  @Input()
  public code: AutoCode | null = null;

  public week: Date = new Date();
  public codes: AutoCodeGroup[] = [];
  public filteredCodes: AutoCodeGroup[] = [];

  constructor(
    private readonly http: HttpClient,
    private readonly elementRef: ElementRef,
    private readonly filterService: FilterService
  ) {}

  ngOnInit(): void {
    // TODO: Ensure this is only called once
    this.http
      .get<CodeGroup[]>('/api/codes')
      .pipe(
        take(1),
        map((codes: CodeGroup[]) => this.mapCodes(codes))
      )
      .subscribe((codes: AutoCodeGroup[]) => (this.codes = codes));
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

  private mapCodes(codes: CodeGroup[]): AutoCodeGroup[] {
    return codes.map(
      (code) =>
        ({
          label: code.name,
          value: code.id,
          items: code.items.map(
            (item: Code) => ({ label: item.name, value: item.id } as AutoCode)
          ),
        } as AutoCodeGroup)
    );
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

export interface CodeGroup {
  id: string;
  name: string;
  description: string;
  items: Code[];
}
