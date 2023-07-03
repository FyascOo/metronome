import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'metronome-root',
  template: `Hello`,
})
export class AppComponent {
  title = 'metronome';
}
