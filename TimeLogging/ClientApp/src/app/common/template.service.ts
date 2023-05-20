import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Account } from './view';

@Injectable({
  providedIn: 'root',
})
export class TemplateService {
  public lastTemplate: Template = {
    id: '',
    name: '',
    description: '',
  };

  private readonly templates = new Map<string, Template>();
  private readonly templateItems = new Map<string, TemplateItem[]>();

  constructor(private readonly http: HttpClient) {}

  public getTemplates(): Observable<Template[]> {
    return this.http.get<ExTemplate[]>('api/templates').pipe(
      map((templates) => {
        return templates.map((template) => {
          this.templateItems.set(template.id, template.items);

          const temp = {
            id: template.id,
            name: template.name,
            description: template.description,
          };

          this.templates.set(template.id, temp);

          if (this.lastTemplate.id == '') {
            this.lastTemplate.id = template.id;
            this.lastTemplate.name = template.name;
            this.lastTemplate.description = template.description;
          }

          return temp;
        });
      })
    );
  }

  public getTemplateItems(templateId: string): TemplateItem[] {
    this.lastTemplate = this.templates.get(templateId) ?? this.lastTemplate;
    return this.templateItems.get(templateId) ?? [];
  }

  public saveTemplate(accounts: Account[]) {
    return this.http.post('api/templates', accounts);
  }
}

interface ExTemplate {
  id: string;
  name: string;
  description: string;
  items: ExTemplateItem[];
}

interface ExTemplateItem {
  id: string;
  parentId: string;
  code: string;
  time: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
}

export interface TemplateItem {
  id: string;
  parentId: string;
  code: string;
  time: string;
}
