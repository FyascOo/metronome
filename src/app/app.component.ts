import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainComponent } from './layout/main.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'metronome-root',
  template: `<metronome-main></metronome-main>`,
  imports: [RouterModule, MainComponent],
})
export class AppComponent {}
