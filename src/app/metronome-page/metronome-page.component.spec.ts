import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MetronomePageComponent } from './metronome-page.component';

describe('MetronomePageComponent', () => {
  let component: MetronomePageComponent;
  let fixture: ComponentFixture<MetronomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetronomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MetronomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
