import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Record, Time} from "../view";

@Component({
  selector: 'app-hour-selector',
  templateUrl: './hour-selector.component.html',
  styleUrls: ['./hour-selector.component.scss']
})
export class HourSelectorComponent implements OnInit {
  @Output()
  public onValueChanged = new EventEmitter<string>();

  @Input()
  public record!: Record;

  public actualValue = '';

  ngOnInit(): void {
    if (!this.record) {
      return;
    }

    this.actualValue = this.formatTime(this.record);
  }

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.actualValue = target.value;
    this.onValueChanged.emit(this.actualValue);
  }

  public formatTime(record: Record): string {
    return record.hours + this.getMinutes(record.minutes);
  }

  private getMinutes(minutes: number): string {
    if (minutes == 0) {
      return '';
    }

    if (minutes % 60 == 0) {
      return '';
    }

    const fraction = minutes / 60 * 100;
    let fractionWithLessDecimals = Math.floor(fraction * 100) / 100;

    return ',' + fractionWithLessDecimals;
  }
}
