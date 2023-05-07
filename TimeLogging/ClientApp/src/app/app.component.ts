import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './common/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private readonly theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.start();
  }
  ngOnDestroy(): void {
    this.theme.stop();
  }
}
