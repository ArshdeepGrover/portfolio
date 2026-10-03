import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none';

const OFFSETS: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Fades and slides the host element into place when it scrolls into view.
 *
 * Usage: `appGsapReveal="up" [gsapDelay]="0.2"`. Respects
 * `prefers-reduced-motion`, in which case the element is shown immediately.
 */
@Directive({
  selector: '[appGsapReveal]',
  standalone: true,
})
export class GsapRevealDirective implements AfterViewInit, OnDestroy {
  /** Direction the element travels from. Defaults to 'up'. */
  @Input('appGsapReveal') direction: RevealDirection | '' = 'up';
  /** Delay in seconds before the reveal starts. */
  @Input() gsapDelay = 0;

  private tween?: gsap.core.Tween;

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    const host = this.el.nativeElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      host.style.opacity = '1';
      return;
    }

    const offset = OFFSETS[(this.direction || 'up') as RevealDirection]
      ?? OFFSETS.up;

    this.zone.runOutsideAngular(() => {
      this.tween = gsap.from(host, {
        opacity: 0,
        x: offset.x,
        y: offset.y,
        duration: 0.7,
        delay: this.gsapDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: host,
          start: 'top 85%',
          once: true,
        },
      });
    });
  }

  ngOnDestroy(): void {
    this.tween?.scrollTrigger?.kill();
    this.tween?.kill();
  }
}
