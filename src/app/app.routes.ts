import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./metronome/metronome.component').then(
        (m) => m.MetronomeComponent
      ),
  },
];
