import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'metronome-start',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: ` <button mat-button (click)="startFC.setValue(!startFC.value)">
    {{ startFC.value ? 'Stop' : 'Start' }}
  </button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartComponent {
  @Output() eventStart: Observable<boolean>;
  startFC = new FormControl(false, { nonNullable: true });

  constructor() {
    this.eventStart = this.startFC.valueChanges;
  }
}
