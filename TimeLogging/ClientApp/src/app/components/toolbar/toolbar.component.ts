import { Component } from '@angular/core';
import { BrokerService } from '../../common/broker.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  constructor(private readonly broker: BrokerService) {}

  public changeTheme(theme: string): void {
    this.broker.set('theme', theme);
  }
}
