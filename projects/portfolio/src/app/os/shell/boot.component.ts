import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';

/**
 * A one-second boot screen, shown once per browser session. The page is
 * already rendered underneath, so it never delays content for crawlers.
 */
@Component({
  selector: 'os-boot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (show()) {
      <div class="boot" [class.out]="leaving()" aria-hidden="true">
        <div class="logo"><i></i></div>
        <div class="bar"><span></span></div>
        <div class="log">{{ line() }}</div>
      </div>
    }
  `,
  styles: [
    `
      .boot { position: fixed; inset: 0; z-index: 200; background: #0a0a0c; display: grid; place-content: center; justify-items: center; gap: 22px; transition: opacity .45s, filter .45s; }
      .boot.out { opacity: 0; filter: blur(6px); pointer-events: none; }
      .logo { width: 54px; height: 54px; border-radius: 50%; background: #ff7955; display: grid; place-items: center; animation: breathe 1.2s var(--ease) infinite alternate; }
      .logo i { width: 20px; height: 20px; border-radius: 50%; background: #0a0a0c; }
      @keyframes breathe { to { transform: scale(1.06); } }
      .bar { width: 180px; height: 4px; border-radius: 4px; background: rgba(255,255,255,.08); overflow: hidden; }
      .bar span { display: block; height: 100%; width: 100%; background: #ff7955; transform-origin: left; animation: load 1s var(--ease) forwards; }
      @keyframes load { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      .log { font: 12px/1 var(--font-mono); color: #6a6862; height: 12px; }
    `,
  ],
})
export class BootComponent implements OnInit {
  readonly show = signal(false);
  readonly leaving = signal(false);
  readonly line = signal('loading kernel…');

  ngOnInit(): void {
    let seen = true;
    try {
      seen = sessionStorage.getItem('os.booted') === '1';
      sessionStorage.setItem('os.booted', '1');
    } catch {
      /* treat as seen */
    }
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.show.set(true);
    const steps = ['loading kernel…', 'mounting ~/projects', 'waking the cat', 'ready'];
    steps.forEach((s, i) => setTimeout(() => this.line.set(s), i * 260));
    setTimeout(() => this.leaving.set(true), 1050);
    setTimeout(() => this.show.set(false), 1550);
  }
}
