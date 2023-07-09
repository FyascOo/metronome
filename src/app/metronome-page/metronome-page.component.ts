import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Howl } from 'howler';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  interval,
  map,
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
      (eventStart)="$event ? initLoop() : stopLoop()"
    ></metronome-start>
    <metronome-bpm
      [start]="start()"
      (emitBPM)="bpm$.next($event)"
    ></metronome-bpm>
    <metronome-mesure
      [start]="start()"
      (emitMesure)="mesure$.next($event)"
    ></metronome-mesure
    ><metronome-metronome
      [mesure]="(mesure$ | async)!"
      [degree]="degree$ | async"
      [blink]="blink$ | async"
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
  mesure$ = new BehaviorSubject<number>(4);
  degree$ = new Subject<number>();
  emitBeep$ = new Subject<number>();
  stopLoop$ = new Subject();
  blink$ = new Subject<number>();
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });

  initLoop() {
    this.start.set(true);
    combineLatest([this.bpm$, this.mesure$, interval(20)])
      .pipe(takeUntil(this.stopLoop$.pipe(tap(() => this.degree$.next(0)))))
      .subscribe(([bpm, mesure, interval]) =>
        this.degree$.next(
          ((interval * 20 * (bpm / 60)) / 1000) * (360 / mesure)
        )
      );

    combineLatest([this.bpm$, this.mesure$])
      .pipe(
        tap(() => this.beep.play()),
        tap(() => this.blink$.next(0)),
        switchMap(([bpm, mesure]) =>
          interval((1000 * 60) / bpm).pipe(
            map((interval) => ({ interval, mesure })),
            takeUntil(this.stopLoop$)
          )
        ),
        takeUntil(this.stopLoop$)
      )
      .subscribe(({ interval, mesure }) => {
        this.beep.play();
        this.blink$.next((interval + 1) % mesure);
      });
  }

  stopLoop() {
    this.start.set(false);
    this.stopLoop$.next(0);
  }
}
