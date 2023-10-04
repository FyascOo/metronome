import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'metronome-mesure',
  standalone: true,
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  template: `<mat-form-field
    class="margin"
    [class]="isStart() ? 'stop' : 'play'"
  >
    <mat-label>Mesure</mat-label>
    <mat-select [formControl]="mesureFC">
      <mat-option *ngFor="let mesure of mesures" [value]="mesure">{{
        mesure
      }}</mat-option>
    </mat-select>
  </mat-form-field>`,
  styles: [
    `
      .stop {
        opacity: 0;
        transition: all 1s;
      }

      .play {
        opacity: 1;
        transition: all 1s;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MesureComponent {
  @Input() set start(start: boolean) {
    if (start) {
      this.isStart.set(true);
      this.mesureFC.disable();
    } else {
      this.isStart.set(false);
      this.mesureFC.enable();
    }
  }
  mesures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  mesureFC = new FormControl(4, { nonNullable: true });
  @Output() emitMesure = this.mesureFC.valueChanges;

  isStart = signal(false);
}
