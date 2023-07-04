import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Howl } from 'howler';
import { BehaviorSubject, Subject, combineLatest } from 'rxjs';
import { BpmComponent } from '../bpm/bpm.component';
import { MesureComponent } from '../mesure/mesure.component';
import { MetronomeComponent } from '../metronome/metronome.component';
import { StartComponent } from '../start/start.component';

@Component({
  selector: 'metronome-metronome-page',
  standalone: true,
  template: `
    <metronome-start
      [start]="start"
      (eventStart)="start = !start"
    ></metronome-start>
    <metronome-bpm (emitBPM)="bpm$.next($event)"></metronome-bpm>
    <metronome-mesure (emitMesure)="mesure$.next($event)"></metronome-mesure
    ><metronome-metronome
      [start]="start"
      [bpm]="bpm$ | async"
      [mesure]="mesure$ | async"
      (emitNbRotate)="nbRotate$.next($event)"
      [isBeeping]="emitBeep$ | async"
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
  start = false;
  bpm$ = new BehaviorSubject(60);
  nbRotate$ = new Subject<number>();
  mesure$ = new BehaviorSubject<number>(4);
  emitBeep$ = new Subject<number>();
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });

  constructor() {
    combineLatest([this.nbRotate$, this.mesure$, this.bpm$]).subscribe(
      ([nbRotate, mesure, bpm]) => {
        const tempo = Array(mesure)
          .fill(0)
          .map((v, i) => {
            const speed = (i + 1) * ((60 / bpm) * 60);
            return Math.round(speed);
          });
        if (tempo.includes(nbRotate)) {
          this._playBip();
          const nbMesure = nbRotate / bpm === 4 ? 0 : nbRotate / bpm;
          this.emitBeep$.next(nbMesure);
        }
      }
    );
  }

  private _playBip() {
    this.beep.play();
  }
}
