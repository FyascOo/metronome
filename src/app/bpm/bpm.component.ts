import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { Observable } from 'rxjs';

@Component({
  selector: 'metronome-bpm',
  standalone: true,
  imports: [
    CommonModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <button class="flex-1" mat-icon-button (click)="update(-1)">
      <mat-icon color="primary" fontIcon="remove"></mat-icon>
    </button>
    <mat-slider discrete min="0" max="260" class="flex-2"
      ><input matSliderThumb [formControl]="bpmFC"
    /></mat-slider>
    <button class="flex-1" mat-icon-button (click)="update(1)">
      <mat-icon color="primary" fontIcon="add"></mat-icon>
    </button>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        justify-content: space-around;

        .flex-1 {
          flex: 1;
        }
        .flex-2 {
          flex: 2;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BpmComponent {
  @Input() set start(start: boolean) {
    if (start) {
      this.bpmFC.disable();
    } else {
      this.bpmFC.enable();
    }
  }
  @Output() emitBPM: Observable<number>;
  bpmFC = new FormControl(60, { nonNullable: true });
  constructor() {
    this.emitBPM = this.bpmFC.valueChanges;
  }

  update(value: number) {
    this.bpmFC.patchValue(this.bpmFC.value + value);
  }
}
