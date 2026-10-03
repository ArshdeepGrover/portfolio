import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A soft glow that trails the pointer. Purely decorative, so it is hidden
 * from assistive tech, skipped when the user prefers reduced motion, and
 * never shown on touch-only devices.
 */
@Component({
  selector: 'app-cursor-glow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor-glow.component.html',
  styleUrls: ['./cursor-glow.component.scss'],
})
export class CursorGlowComponent implements OnInit, OnDestroy {
  @ViewChild('glow', { static: true }) glow!: ElementRef<HTMLElement>;

  enabled = false;

  private targetX = 0;
  private targetY = 0;
  private currentX = 0;
  private currentY = 0;
  private frame = 0;

  private onMove = (event: MouseEvent) => {
    this.targetX = event.clientX;
    this.targetY = event.clientY;
  };

  constructor(private zone: NgZone) {}

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;

    if (reducedMotion || !finePointer) return;

    this.enabled = true;
    this.currentX = this.targetX = window.innerWidth / 2;
    this.currentY = this.targetY = window.innerHeight / 2;

    this.zone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.onMove, { passive: true });
      this.tick();
    });
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('mousemove', this.onMove);
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  /** Eases the glow toward the pointer so it lags slightly behind. */
  private tick = (): void => {
    this.currentX += (this.targetX - this.currentX) * 0.12;
    this.currentY += (this.targetY - this.currentY) * 0.12;

    const node = this.glow?.nativeElement;
    if (node) {
      node.style.transform = `translate3d(${this.currentX.toFixed(
        2
      )}px, ${this.currentY.toFixed(2)}px, 0) translate(-50%, -50%)`;
    }

    this.frame = requestAnimationFrame(this.tick);
  };
}
