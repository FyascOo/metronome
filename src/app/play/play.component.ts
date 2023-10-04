import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'metronome-play',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `<button
    class="size"
    [class]="(play$ | async) ? 'stop' : 'play'"
    (click)="play$.next(!play$.value)"
    mat-raised-button
    color="primary"
  >
    {{ (play$ | async) ? 'Stop' : 'Play' }}
  </button>`,
  styles: [
    `
      .size {
        width: 120px;
        height: 56px;
      }

      .stop {
        opacity: 0;
        transition: all 3s;
      }

      .play {
        opacity: 1;
        transition: all 1s;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayComponent {
  @Output() play$ = new BehaviorSubject(false);
}
