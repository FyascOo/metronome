import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Observable } from 'rxjs';

@Component({
  selector: 'metronome-bpm',
  standalone: true,
  imports: [CommonModule, MatSliderModule, ReactiveFormsModule],
  template: `<mat-slider [formControl]="bpmFC" min="0" max="260"
    ><input matSliderThumb
  /></mat-slider>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BpmComponent {
  @Output() emitBPM: Observable<any>;
  bpmFC = new FormControl(60);
  constructor() {
    this.emitBPM = this.bpmFC.valueChanges;
  }
}
