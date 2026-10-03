import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

/**
 * Translates the host element vertically as the page scrolls.
 *
 * A positive speed moves the element with the scroll (appearing further away),
 * a negative speed moves it against the scroll. Respects
 * `prefers-reduced-motion`, in which case the element stays put.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, OnDestroy {
  /** Fraction of the scroll distance to offset by. */
  @Input() parallaxSpeed = 0.2;

  private frame = 0;
  private onScroll = () => this.schedule();

  constructor(
    private el: ElementRef<HTMLElement>,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this.el.nativeElement.style.willChange = 'transform';

    this.zone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.apply();
    });
  }

  ngOnDestroy(): void {
    if (typeof window === 'undefined') return;
    window.removeEventListener('scroll', this.onScroll);
    if (this.frame) cancelAnimationFrame(this.frame);
  }

  private schedule(): void {
    if (this.frame) return;
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.apply();
    });
  }

  private apply(): void {
    const host = this.el.nativeElement;
    const rect = host.getBoundingClientRect();

    // Distance of the element's centre from the viewport centre, so the
    // offset is zero when the element is centred on screen.
    const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
    const offset = -fromCentre * this.parallaxSpeed;

    host.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  }
}
