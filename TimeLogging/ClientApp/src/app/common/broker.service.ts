import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  private readonly _broker: Map<string, Subject<any>> = new Map<string, Subject<any>>();

  constructor() { }

  public set<T>(key: string, value: T): void {
    if (this._broker.has(key)) {
      this._broker.get(key)?.next(value);
      return;
    }

    const subject = new Subject<any>();
    this._broker.set(key, subject);

    subject.next(value);
  }

  public get<T>(key: string): Observable<T> {
    if (!this._broker.has(key)) {
      const subject = new Subject<any>();
      this._broker.set(key, subject);
    }

    return this._broker.get(key) as Observable<T>;
  }
}
