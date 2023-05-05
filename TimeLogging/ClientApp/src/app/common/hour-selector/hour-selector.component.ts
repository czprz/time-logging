import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Time} from "../view";

@Component({
  selector: 'app-hour-selector',
  templateUrl: './hour-selector.component.html',
  styleUrls: ['./hour-selector.component.scss']
})
export class HourSelectorComponent implements OnInit {
  @Output()
  public onValueChanged = new EventEmitter<string>();

  @Input()
  public value: Time[] = [];

  @Input()
  public date: Date | null | undefined;

  public actualValue = '';

  ngOnInit(): void {
    const time = this.value.find(x => this.isWithinSameDay(x.date));
    console.log(this.date);
    console.log(this.value)
    if (!time) {
      return;
    }

    console.log(time)
    this.actualValue = time?.time ?? '';
  }

  private isWithinSameDay(date: Date) {
    const newDate = new Date(date);
    return newDate.getFullYear() === this.date?.getFullYear() &&
      newDate.getMonth() === this.date?.getMonth() &&
      newDate.getDate() === this.date?.getDate();
  }

  onChange($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.actualValue = target.value;
    this.onValueChanged.emit(this.actualValue);
  }
}
