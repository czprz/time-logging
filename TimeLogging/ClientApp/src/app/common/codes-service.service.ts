import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, zip } from 'rxjs';
import {AutoCodeGroup, Code, Product} from './code-selector/code-selector.component';

@Injectable({
  providedIn: 'root',
})
export class CodesServiceService {
  private readonly codes$ = new BehaviorSubject<AutoCodeGroup[]|null>(null);

  constructor(private readonly http: HttpClient) {}

  public getCodes() {
    const products$ = this.http.get<Product[]>('/api/products');
    const codes$ = this.http.get<Code[]>('/api/codes');

    if (this.codes$.value != null) {
      return this.codes$;
    }

    zip<[Product[], Code[]]>(products$, codes$)
      .pipe(map(([products, codes]) => this.map(products, codes)))
      .subscribe((x) => this.codes$.next(x));

    return this.codes$;
  }

  private map(products: Product[], codes: Code[]): AutoCodeGroup[] {
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
