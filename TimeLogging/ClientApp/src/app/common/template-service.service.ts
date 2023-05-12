import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateServiceService {
  public lastTemplate: Template | null = null;

  constructor(private readonly http: HttpClient) {}

  public getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>('api/templates');
  }

  public getItems(id: string): Observable<TemplateItem[]> {
    return this.http.get<TemplateItem[]>(`api/templates/items/${id}`);
  }
}

export interface Template {
  id: string;
  name: string;
}

export interface TemplateItem {
  id: string;
  parentId: string;
  code: string;
  time: string;
}
