import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BrokerService } from './broker.service';
import { Subject, takeUntil } from 'rxjs';
import { ConfigFacadeService } from './config-facade.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public theme: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly broker: BrokerService,
    private readonly configFacade: ConfigFacadeService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  public start(): void {
    const theme = this.configFacade.getTheme() || 'light-theme';
    this.changeTheme(theme);

    this.broker
      .get<string>('theme')
      .pipe(takeUntil(this.destroy$))
      .subscribe((theme) => {
        if (theme === this.theme || !theme) {
          return;
        }

        this.changeTheme(theme);
        this.configFacade.setTheme(theme);
      });
  }

  public stop(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private changeTheme(theme: string): void {
    const header = this.document.getElementsByTagName('head')[0];
    let themeLink = this.document.getElementById(
      'theme-css'
    ) as HTMLLinkElement;

    if (!themeLink) {
      themeLink = this.document.createElement('link');
      themeLink.id = 'theme-css';
      themeLink.rel = 'stylesheet';
      header.appendChild(themeLink);
    }

    themeLink.href = theme + '.css';

    this.theme = theme;
  }
}
