import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true
})
export class MagneticDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    // Move the button by 30% of the distance from the center
    this.el.nativeElement.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transform = `translate(0px, 0px)`;
  }
}
