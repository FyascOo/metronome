import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'metronome-start',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: ` <button mat-button (click)="eventStart.emit()">
    {{ start ? 'Stop' : 'Start' }}
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent {
  @Input() start = false;
  @Output() eventStart = new EventEmitter<boolean>();
}
