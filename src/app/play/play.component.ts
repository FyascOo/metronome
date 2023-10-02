import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'metronome-play',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `<button mat-raised-button color="primary">Play</button>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayComponent {}
