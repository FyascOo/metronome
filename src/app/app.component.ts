import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './layout/main.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'metronome-root',
  template: `<metronome-main><router-outlet></router-outlet></metronome-main>`,
  styles: [
    `
      :host {
        flex: 1;
        display: flex;
      }
    `,
  ],
  imports: [RouterModule, MainComponent],
})
export class AppComponent {}
