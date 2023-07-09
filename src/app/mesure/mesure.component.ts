import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';

@Component({
  selector: 'metronome-mesure',
  standalone: true,
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule],
  template: `<mat-form-field>
    <mat-label>Toppings</mat-label>
    <mat-select [formControl]="mesureFC">
      <mat-option *ngFor="let mesure of mesures" [value]="mesure">{{
        mesure
      }}</mat-option>
    </mat-select>
  </mat-form-field>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MesureComponent {
  @Input() set start(start: boolean) {
    if (start) {
      this.mesureFC.disable();
    } else {
      this.mesureFC.enable();
    }
  }
  @Output() emitMesure: Observable<number>;
  mesures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  mesureFC = new FormControl(4, { nonNullable: true });
  constructor() {
    this.emitMesure = this.mesureFC.valueChanges;
  }
}
