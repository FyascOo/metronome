import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  selector: 'metronome-root',
  template: `<button mat-raised-button color="primary">Basic</button>`,
})
export class AppComponent {
  title = 'metronome';
}
