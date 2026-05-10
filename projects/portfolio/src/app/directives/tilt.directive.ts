import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true
})
export class TiltDirective {
  @Input() maxTilt = 15; // maximum tilt in degrees
  @Input() perspective = 1000;
  @Input() scale = 1.05; // scale on hover

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
    this.el.nativeElement.style.transformStyle = 'preserve-3d';
    this.el.nativeElement.style.willChange = 'transform';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.transition = 'transform 0.1s ease-out';
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -this.maxTilt;
    const rotateY = ((x - centerX) / centerX) * this.maxTilt;

    this.el.nativeElement.style.setProperty('--mouse-x', `${x}px`);
    this.el.nativeElement.style.setProperty('--mouse-y', `${y}px`);

    this.el.nativeElement.style.transform = `perspective(${this.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${this.scale})`;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.transition = 'transform 0.5s ease-out';
    this.el.nativeElement.style.transform = `perspective(${this.perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
  }
}
