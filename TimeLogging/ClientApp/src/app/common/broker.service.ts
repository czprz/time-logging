import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  private readonly _broker: Map<string, BehaviorSubject<any>> = new Map<
    string,
    BehaviorSubject<any>
  >();

  constructor() {}

  public set<T>(key: string, value: T): void {
    if (this._broker.has(key)) {
      this._broker.get(key)?.next(value);
      return;
    }

    const obs$ = this.setMap(key);

    obs$.next(value);
  }

  public getOrDefault<T>(key: string, defaultValue: T): T {
    if (!this._broker.has(key)) {
      this.setMap(key);
    }

    return this._broker.get(key)?.value ?? defaultValue;
  }

  public get<T>(key: string): T {
    if (!this._broker.has(key)) {
      this.setMap(key);
    }

    return this._broker.get(key)?.value as T;
  }

  public get$<T>(key: string): Observable<T> {
    if (!this._broker.has(key)) {
      this.setMap(key);
    }

    return this._broker.get(key) as Observable<T>;
  }

  private setMap(key: string): BehaviorSubject<any> {
    const subject = new BehaviorSubject<any>(null);
    this._broker.set(key, subject);

    return subject;
  }
}
