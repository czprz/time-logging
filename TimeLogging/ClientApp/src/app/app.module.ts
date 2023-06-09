import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { BrokerService } from './common/broker.service';
import { DateSelectorService } from './common/date-selector.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/hour-logging/hour-logging.module').then(
        (m) => m.HourLoggingModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent, ToolbarComponent],
  imports: [
    ButtonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    OverlayPanelModule,
    CalendarModule,
    DropdownModule,
  ],
  providers: [BrokerService, DateSelectorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
