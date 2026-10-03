import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, inject } from '@angular/core';

/** Fades an element up the first time it scrolls into view. */
@Directive({ selector: '[osReveal]', standalone: true })
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() osReveal: number | string = '';
  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement as HTMLElement;
    node.classList.add('os-reveal');
    if (Number(this.osReveal)) node.style.transitionDelay = `${Number(this.osReveal)}ms`;
    if (!('IntersectionObserver' in window)) {
      node.classList.add('in');
      return;
    }
    this.io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('in');
          this.io?.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    this.io.observe(node);
  }

  ngOnDestroy(): void {
    this.io?.disconnect();
  }
}
