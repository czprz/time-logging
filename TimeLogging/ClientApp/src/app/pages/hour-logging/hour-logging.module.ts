import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HourLoggingComponent } from './hour-logging.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import {CodeSelectorComponent} from "../../common/code-selector/code-selector.component";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {HourSelectorComponent} from "../../common/hour-selector/hour-selector.component";
import {SplitButtonModule} from "primeng/splitbutton";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HourLoggingComponent,
  },
];

@NgModule({
  declarations: [
    HourLoggingComponent,
    WeekViewComponent,
    CodeSelectorComponent,
    HourSelectorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ToolbarModule,
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    AutoCompleteModule,
    FormsModule,
    SplitButtonModule,
  ],
  providers: [MessageService],
})
export class HourLoggingModule {}
