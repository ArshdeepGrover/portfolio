import { Component, AfterViewInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, NgZone, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILink } from '@models/link.model';
import { links } from '@stores/links_store';
import { ThemeService } from '@shared/services/theme.service';

interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private themeService = inject(ThemeService);
  private ngZone = inject(NgZone);
  isDarkMode = this.themeService.isDarkMode;

  visibleLinks: ILink[] = links.filter((link) => link.show);
  currentYear = new Date().getFullYear();

  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private prevMouseX = 0;
  private prevMouseY = 0;
  private animationId = 0;
  private glowEl!: HTMLElement;
  private mouseMoveHandler = (e: MouseEvent) => this.handleMouseMove(e);
  private resizeHandler = () => this.resizeCanvas();

  ngAfterViewInit(): void {
    this.initializeAnimations();
    this.initCanvas();
    this.initCursorGlow();

    // Run outside Angular zone for performance — no change detection on every frame
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.mouseMoveHandler);
      window.addEventListener('resize', this.resizeHandler);
      this.animate();
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('resize', this.resizeHandler);
    this.glowEl?.remove();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private initCursorGlow(): void {
    this.glowEl = document.createElement('div');
    this.glowEl.classList.add('cursor-glow');
    document.body.appendChild(this.glowEl);
  }

  private handleMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Spawn particles on movement
    const dx = this.mouseX - this.prevMouseX;
    const dy = this.mouseY - this.prevMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    const count = Math.min(Math.floor(speed / 3), 8);

    for (let i = 0; i < count; i++) {
      this.spawnParticle(
        this.mouseX + (Math.random() - 0.5) * 10,
        this.mouseY + (Math.random() - 0.5) * 10,
        speed
      );
    }

    // Move the glow element directly (no Angular CD)
    this.glowEl.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;

    this.prevMouseX = this.mouseX;
    this.prevMouseY = this.mouseY;
  }

  private spawnParticle(x: number, y: number, speed: number): void {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 1.5 + 0.5;
    const maxLife = Math.random() * 40 + 20;

    this.particles.push({
      x,
      y,
      size: Math.random() * 4 + 2,
      alpha: 1,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 0.5,
      life: 0,
      maxLife,
      hue: Math.random() * 30 + 10, // 10-40 range → orange-amber
    });
  }

  private animate = (): void => {
    this.animationId = requestAnimationFrame(this.animate);

    const ctx = this.ctx;
    const canvas = this.canvasRef.nativeElement;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.02; // slight gravity
      p.alpha = 1 - p.life / p.maxLife;
      p.size *= 0.98;

      if (p.life >= p.maxLife || p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      // Glowing particle
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${p.alpha})`;
      ctx.shadowBlur = 15;
      ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${p.alpha * 0.6})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  };

  private initializeAnimations(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));
  }
}
