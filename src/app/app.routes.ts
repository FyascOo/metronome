import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./metronome-page/metronome-page.component').then(
        (m) => m.MetronomePageComponent
      ),
  },
];
