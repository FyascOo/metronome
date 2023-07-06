import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Howl } from 'howler';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  interval,
  takeUntil,
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
      .pipe(takeUntil(this.stopLoop$))
      .subscribe(([bpm, mesure, interval]) => {
        const degree = ((interval * 20 * (bpm / 60)) / 1000) * (360 / mesure);
        console.log(degree);
        this.degree$.next(degree);
        if (degree === (90 || 180 || 270)) {
          this.beep.play();
        }
      });
  }
}
