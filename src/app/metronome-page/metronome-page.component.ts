import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
      (eventStart)="$event ? initLoop() : stopLoop()"
    ></metronome-start>
    <metronome-bpm (emitBPM)="bpm$.next($event)"></metronome-bpm>
    <metronome-mesure (emitMesure)="mesure$.next($event)"></metronome-mesure
    ><metronome-metronome [mesure]="(mesure$ | async)!"></metronome-metronome>
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
  nbRotate$ = new Subject<number>();
  mesure$ = new BehaviorSubject<number>(4);
  emitBeep$ = new Subject<number>();
  beep = new Howl({
    src: ['../assets/son/bip.flac'],
  });

  initLoop() {}
  stopLoop() {}
  private _playBip() {
    this.beep.play();
  }
}
