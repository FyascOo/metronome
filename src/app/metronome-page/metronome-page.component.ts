import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Howl } from 'howler';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  interval,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { BpmComponent } from '../bpm/bpm.component';
import { MesureComponent } from '../mesure/mesure.component';
import { MetronomeComponent } from '../metronome/metronome.component';
import { StartComponent } from '../start/start.component';

@Component({
  selector: 'metronome-metronome-page',
  standalone: true,
  template: `
    <metronome-start
      (eventStart)="$event ? initLoop() : stopLoop$.next(0)"
    ></metronome-start>
    <metronome-bpm (emitBPM)="bpm$.next($event)"></metronome-bpm>
    <metronome-mesure (emitMesure)="mesure$.next($event)"></metronome-mesure
    ><metronome-metronome
      [mesure]="(mesure$ | async)!"
      [degree]="degree$ | async"
    ></metronome-metronome>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MetronomeComponent,
    StartComponent,
    BpmComponent,
    MesureComponent,
  ],
})
export class MetronomePageComponent {
  start = signal(false);
  bpm$ = new BehaviorSubject(60);
  degree$ = new Subject<number>();
  mesure$ = new BehaviorSubject<number>(4);
  emitBeep$ = new Subject<number>();
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });
  stopLoop$ = new Subject();

  initLoop() {
    combineLatest([this.bpm$, this.mesure$, interval(20)])
      .pipe(takeUntil(this.stopLoop$.pipe(tap(() => this.degree$.next(0)))))
      .subscribe(([bpm, mesure, interval]) => {
        // nombre d'interval * 20ms * bpm ramené à des secondes / 1000 pour ramené à des secondes * le nombre de degree par mesure
        const degree = ((interval * 20 * (bpm / 60)) / 1000) * (360 / mesure);
        this.degree$.next(degree);
      });
    this.bpm$
      .pipe(
        tap(() => this.beep.play()),
        switchMap((bpm) =>
          interval((1000 * 60) / bpm).pipe(takeUntil(this.stopLoop$))
        ),
        takeUntil(this.stopLoop$)
      )
      .subscribe(() => this.beep.play());
  }
}
