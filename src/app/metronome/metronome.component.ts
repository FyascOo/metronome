import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { BehaviorSubject, delay, of, take } from 'rxjs';

@Component({
  selector: 'metronome-metronome',
  standalone: true,
  imports: [CommonModule],
  template: ` <svg
    width="400"
    height="400"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="metronome">
      <rect width="200" height="200" fill="white" />
      <g id="circle" filter="url(#filter0_d)">
        <circle cx="102" cy="102" r="90" fill="white" />
        <circle cx="102" cy="102" r="89.5" stroke="url(#paint0_linear)" />
      </g>
      <ellipse
        #pointer
        id="pointer"
        cx="101.5"
        cy="12.5"
        rx="11.5"
        ry="10.5"
        fill="url(#paint1_radial)"
      />
      <rect
        *ngFor="let nb of mesures"
        #mesure
        id="mesure"
        x="101"
        width="1"
        height="25"
        rx="0.5"
        fill="black"
      />
    </g>
    <defs>
      <filter
        id="filter0_d"
        x="8"
        y="12"
        width="188"
        height="188"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="paint0_linear"
        x1="156.5"
        y1="30.5"
        x2="41"
        y2="171.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#37D500" stop-opacity="0.69" />
        <stop offset="1" stop-color="#BE0000" stop-opacity="0.74" />
      </linearGradient>
      <radialGradient
        id="paint1_radial"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(101.5 12.5) rotate(90) scale(10.5 11.5)"
      >
        <stop stop-color="#5BEF00" stop-opacity="0.15" />
        <stop offset="1" stop-color="#00FF38" stop-opacity="0.71" />
      </radialGradient>
    </defs>
  </svg>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetronomeComponent {
  @ViewChild('pointer') set pointer(pointer: ElementRef) {
    this.degree$.subscribe((degree) => {
      pointer.nativeElement.style.transformOrigin = 'center';
      pointer.nativeElement.style.transform = `rotateZ(${degree}deg)`;
    });
  }
  @ViewChildren('mesure') set barMesures(barMesures: QueryList<ElementRef>) {
    barMesures.forEach((barMesure, i) => {
      const degree = (360 / this.mesures.length) * i;
      barMesure.nativeElement.style.transformOrigin = 'center';
      barMesure.nativeElement.style.transform = `rotateZ(${degree}deg)`;
    });
  }

  @Input() set mesure(mesure: number) {
    this.mesures = [...Array(mesure).keys()];
  }

  @Input() set degree(degree: number | null) {
    if (degree !== null) {
      this.degree$.next(degree);
    }
  }

  @Input() set barMesureBlink(value: number) {
    this.barMesures.get(value)!.nativeElement.style.fill = 'red';
    of(1)
      .pipe(take(1), delay(300))
      .subscribe(
        () => (this.barMesures.get(value)!.nativeElement.style.fill = 'black')
      );
  }

  mesures!: number[];
  degree$ = new BehaviorSubject<number>(0);
}
