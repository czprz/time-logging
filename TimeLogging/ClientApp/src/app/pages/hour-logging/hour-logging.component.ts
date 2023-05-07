import { Component } from '@angular/core';
import { View } from '../../common/view';
import {take} from "rxjs";

@Component({
  selector: 'app-hour-logging',
  templateUrl: './hour-logging.component.html',
  styleUrls: ['./hour-logging.component.scss'],
})
export class HourLoggingComponent {
  public view = View;
  public selectedView = View.Week;
}

