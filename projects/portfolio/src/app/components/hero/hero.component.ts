import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Typed from 'typed.js';
import { gsap } from 'gsap';
import { TiltDirective } from '../../directives/tilt.directive';
import { MagneticDirective } from '../../directives/magnetic.directive';
import { ParallaxDirective } from '../../directives/parallax.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TiltDirective,
    MagneticDirective,
    ParallaxDirective,
  ],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;
  @ViewChild('typedCodeElement', { static: true }) typedCodeElement!: ElementRef;

  private typed!: Typed;
  private typedCode!: Typed;
  private entranceTl?: gsap.core.Timeline;

  constructor(private el: ElementRef<HTMLElement>, private zone: NgZone) {}

  ngOnInit() {
    this.initTypedAnimations();
  }

  ngAfterViewInit() {
    this.initEntranceAnimation();
  }

  ngOnDestroy() {
    if (this.typed) this.typed.destroy();
    if (this.typedCode) this.typedCode.destroy();
    this.entranceTl?.kill();
  }

  private initEntranceAnimation() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const root = this.el.nativeElement;
    const highlights = root.querySelectorAll('.highlight-item');
    const imageWrapper = root.querySelector('.hero-image-float');
    const codeSnippet = root.querySelector('.code-snippet');

    this.zone.runOutsideAngular(() => {
      this.entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (imageWrapper) {
        this.entranceTl.from(imageWrapper, {
          opacity: 0,
          scale: 0.85,
          rotateY: 25,
          duration: 1,
        }, 0.1);
      }

      if (codeSnippet) {
        this.entranceTl.from(codeSnippet, {
          opacity: 0,
          y: 30,
          rotateX: 20,
          duration: 0.8,
        }, 0.4);
      }

      if (highlights.length) {
        this.entranceTl.from(highlights, {
          opacity: 0,
          y: 20,
          scale: 0.9,
          duration: 0.5,
          stagger: 0.08,
        }, 0.5);
      }
    });
  }

  private initTypedAnimations() {
    // Role typing animation
    this.typed = new Typed(this.typedElement.nativeElement, {
      strings: [
        'Full-stack developer',
        'Technical trainer',
        'Angular and Ruby on Rails',
        'Hackathon mentor and judge'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: false
    });

    // Code typing animation
    this.typedCode = new Typed(this.typedCodeElement.nativeElement, {
      strings: [
        '<span class="code-keyword">const</span> <span class="code-variable">arshdeep</span> = <span class="code-keyword">new</span> <span class="code-class">Developer</span>();',
        '<span class="code-variable">arshdeep</span>.<span class="code-property">stack</span> = [<span class="code-string">"Angular"</span>, <span class="code-string">"Rails"</span>];',
        '<span class="code-variable">arshdeep</span>.<span class="code-method">build</span>(<span class="code-string">"web-products"</span>);',
        '<span class="code-variable">arshdeep</span>.<span class="code-method">teach</span>(<span class="code-string">"how-to-build-them"</span>);',
        '<span class="code-console">console</span>.<span class="code-method">log</span>(<span class="code-string">"Delhi NCR, India"</span>);'
      ],
      typeSpeed: 100,
      backSpeed: 10,
      backDelay: 3000,
      loop: true,
      showCursor: false
    });
  }
}