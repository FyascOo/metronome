import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  selector: 'metronome-root',
  template: `<button mat-button>Basic</button>`,
})
export class AppComponent {
  title = 'metronome';
}
