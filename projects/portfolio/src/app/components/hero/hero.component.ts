import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  HostListener,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;
  @ViewChild('typedCodeElement', { static: true }) typedCodeElement!: ElementRef;
  @ViewChild('heroImageRef') heroImageRef!: ElementRef<HTMLDivElement>;

  private ngZone = inject(NgZone);
  private typed!: Typed;
  private typedCode!: Typed;
  private heroEl!: HTMLElement | null;
  private rafId: number | null = null;

  // ── Scroll Parallax ──────────────────────────────────
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.rafId !== null) return;
    this.rafId = requestAnimationFrame(() => {
      this.applyParallax(window.scrollY);
      this.rafId = null;
    });
  }

  private applyParallax(scrollY: number): void {
    if (!this.heroEl) return;
    this.heroEl.style.setProperty('--scroll-y', `${scrollY}`);
  }

  // ── Hero Image 3D Tilt ───────────────────────────────
  onImageMouseMove(event: MouseEvent): void {
    const el = this.heroImageRef?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;   // -0.5 → +0.5
    const y = (event.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform = `
      perspective(900px)
      rotateY(${x * 14}deg)
      rotateX(${-y * 10}deg)
      translateZ(10px)
      scale(1.03)
    `;
  }

  onImageMouseLeave(): void {
    const el = this.heroImageRef?.nativeElement;
    if (el) el.style.transform = '';
  }

  ngOnInit(): void {
    this.initTypedAnimations();
  }

  ngAfterViewInit(): void {
    this.heroEl = document.getElementById('hero');
  }

  ngOnDestroy(): void {
    if (this.typed) this.typed.destroy();
    if (this.typedCode) this.typedCode.destroy();
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  private initTypedAnimations(): void {
    this.typed = new Typed(this.typedElement.nativeElement, {
      strings: [
        'Full-Stack Developer',
        'Angular Developer',
        'Ruby on Rails Developer',
        'Agile Team Leader',
        'Hackathon Mentor',
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: false,
    });

    this.typedCode = new Typed(this.typedCodeElement.nativeElement, {
      strings: [
        '<span class="code-keyword">const</span> <span class="code-variable">developer</span> = <span class="code-keyword">new</span> <span class="code-class">FullStackDev</span>();',
        '<span class="code-variable">developer</span>.<span class="code-property">skills</span> = [<span class="code-string">"Angular"</span>, <span class="code-string">"Ruby"</span>];',
        '<span class="code-variable">developer</span>.<span class="code-method">build</span>(<span class="code-string">"amazing-projects"</span>);',
        '<span class="code-variable">developer</span>.<span class="code-property">role</span> = <span class="code-string">"Hackathon Mentor "</span>;',
        '<span class="code-console">console</span>.<span class="code-method">log</span>(<span class="code-string">"Ready to code!"</span>);',
      ],
      typeSpeed: 100,
      backSpeed: 10,
      backDelay: 3000,
      loop: true,
      showCursor: false,
    });
  }
}
