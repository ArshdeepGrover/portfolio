import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  NgZone,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { OsService } from '../os.service';
import { CAT_FRAMES, CatFrame } from './cat-sprites';

type CatState = 'perch' | 'chase' | 'idle' | 'goto' | 'sit' | 'groom' | 'sleep' | 'gohome';

const PALETTE: Record<string, string> = {
  k: '#1d1714',
  o: '#ff7955',
  d: '#d4542e',
  w: '#fff1e8',
  p: '#ffab96',
  e: '#1d1714',
};

const GRID_W = 20;
const GRID_H = 16;
/** Pixel size. 20x16 grid at 2.5 = a 50x40 cat, small enough to sit in the menu bar. */
const SCALE = 2.5;
const W = GRID_W * SCALE;
const H = GRID_H * SCALE;
const SPEED = 520; // px per second while running
const REACH = 46; // stop this far from the cursor
const SIT_LOCK_MS = 1400; // after sitting where you clicked, ignore the mouse this long
const GROOM_AFTER_MS = 4500;
const SLEEP_AFTER_MS = 11000;

/**
 * A small pixel cat that lives on the menu bar. Move the mouse and it chases
 * the cursor; click anywhere and it runs there and sits; move again and it
 * gets back up. Runs entirely outside Angular change detection: one rAF loop
 * that writes a transform and redraws a 20x16 canvas when the frame changes.
 */
@Component({
  selector: 'os-cat',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="cat" #cat aria-hidden="true">
      <span class="bubble" #bubble></span>
      <canvas #canvas [width]="w" [height]="h"></canvas>
    </div>
  `,
  styles: [
    `
      :host { position: fixed; inset: 0 auto auto 0; z-index: 70; pointer-events: none; }
      .cat { position: fixed; left: 0; top: 0; width: ${W}px; height: ${H}px; will-change: transform; transition: opacity .3s; }
      .cat.hidden { opacity: 0; }
      canvas { width: 100%; height: 100%; image-rendering: pixelated; display: block; filter: drop-shadow(0 2px 0 rgba(0, 0, 0, .18)); }
      :host-context(.dark) canvas { filter: drop-shadow(0 0 6px rgba(255, 121, 85, .28)); }
      .bubble {
        position: absolute; left: 50%; bottom: calc(100% + 2px); transform: translateX(-50%) scale(.6);
        font: 600 11px/1 var(--font-mono); color: var(--text); white-space: nowrap;
        background: var(--surface); border: 1px solid var(--line-2); border-radius: 999px;
        padding: 4px 8px; opacity: 0; transition: opacity .18s, transform .18s; pointer-events: none;
      }
      .bubble.show { opacity: 1; transform: translateX(-50%) scale(1); }
    `,
  ],
})
export class CatComponent implements AfterViewInit {
  @ViewChild('cat') catRef!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('bubble') bubbleRef!: ElementRef<HTMLSpanElement>;

  readonly w = GRID_W * 4;
  readonly h = GRID_H * 4;

  private os = inject(OsService);
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  private x = -100;
  private y = -100;
  private target = { x: 0, y: 0 };
  private mouse = { x: 0, y: 0, seen: false };
  private state: CatState = 'perch';
  private stateSince = 0;
  private facing: 1 | -1 = -1;
  private frame: CatFrame = 'sit1';
  private drawn = '';
  private raf = 0;
  private last = 0;
  private reduceMotion = false;
  private bubbleTimer?: ReturnType<typeof setTimeout>;
  private frames = new Map<string, HTMLCanvasElement>();

  constructor() {
    effect(() => {
      const on = this.os.catEnabled();
      this.catRef?.nativeElement.classList.toggle('hidden', !on);
      if (on && this.catRef) this.setState('gohome');
    });
  }

  ngAfterViewInit(): void {
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.prerender();
    this.catRef.nativeElement.classList.toggle('hidden', !this.os.catEnabled());
    const perch = this.perchPoint();
    this.x = perch.x;
    this.y = perch.y;

    this.zone.runOutsideAngular(() => {
      const onMove = (e: PointerEvent) => {
        if (e.pointerType === 'touch') return;
        this.mouse = { x: e.clientX, y: e.clientY, seen: true };
        this.onMouseMove();
      };
      const onDown = (e: PointerEvent) => {
        if (e.button !== 0 || !this.os.catEnabled()) return;
        if (this.hitsCat(e.clientX, e.clientY)) {
          this.pet();
          return;
        }
        // Clicks inside overlays (palette, terminal) shouldn't drag the cat around.
        if ((e.target as HTMLElement)?.closest?.('[data-cat-ignore]')) return;
        this.target = this.clampPoint(e.clientX, e.clientY + H * 0.5);
        this.setState('goto');
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      const loop = (t: number) => {
        this.tick(t);
        this.raf = requestAnimationFrame(loop);
      };
      this.raf = requestAnimationFrame(loop);

      this.destroyRef.onDestroy(() => {
        cancelAnimationFrame(this.raf);
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointerdown', onDown);
      });
    });

    const home = this.os.catHome$.subscribe(() => this.setState('gohome'));
    const pet = this.os.catPet$.subscribe(() => this.pet());
    this.destroyRef.onDestroy(() => {
      home.unsubscribe();
      pet.unsubscribe();
    });
  }

  // ── behaviour ────────────────────────────────────────────────────────────

  private onMouseMove(): void {
    if (!this.os.catEnabled()) return;
    const now = performance.now();
    switch (this.state) {
      case 'perch':
        // First sign of life: a beat of surprise, then off it goes.
        if (now - this.stateSince > 600) {
          this.say('!', 500);
          this.setState('chase');
        }
        break;
      case 'sit':
        // Moving during the short pause still counts: it gets up when the pause ends.
        if (now - this.stateSince > SIT_LOCK_MS) this.setState('chase');
        else this.wakePending = true;
        break;
      case 'groom':
      case 'sleep':
        if (this.distToMouse() > REACH * 1.6 || this.wasClickSit) {
          if (this.state === 'sleep') this.say('?', 600);
          this.setState('chase');
        }
        break;
      case 'idle':
        if (this.distToMouse() > REACH * 1.6) this.setState('chase');
        break;
    }
  }

  private wasClickSit = false;
  private wakePending = false;

  private setState(s: CatState): void {
    if (s === 'sit') {
      this.wasClickSit = true;
      this.wakePending = false;
    }
    if (s === 'chase' || s === 'gohome' || s === 'perch') this.wasClickSit = false;
    this.state = s;
    this.stateSince = performance.now();
    if (s === 'sleep') this.say('z z', 0);
    else if (this.bubbleRef?.nativeElement.textContent === 'z z') this.say('', 0);
  }

  private tick(t: number): void {
    const dt = Math.min(0.05, (t - (this.last || t)) / 1000);
    this.last = t;
    const now = performance.now();
    const age = now - this.stateSince;

    switch (this.state) {
      case 'perch': {
        const p = this.perchPoint();
        this.x = p.x;
        this.y = p.y;
        this.facing = -1;
        this.frame = this.idleFrame(t);
        if (age > 25000) this.frame = Math.floor(t / 900) % 2 ? 'sleep1' : 'sleep2';
        break;
      }
      case 'chase': {
        const goal = this.clampPoint(this.mouse.x, this.mouse.y + H * 0.6);
        this.target = goal;
        if (this.moveToward(goal, dt, REACH)) this.setState('idle');
        this.frame = Math.floor(t / 110) % 2 ? 'run1' : 'run2';
        break;
      }
      case 'goto':
      case 'gohome': {
        const goal = this.state === 'gohome' ? this.perchPoint() : this.target;
        const arrived = this.moveToward(goal, dt, 2);
        this.frame = Math.floor(t / 110) % 2 ? 'run1' : 'run2';
        if (arrived) this.setState(this.state === 'gohome' ? 'perch' : 'sit');
        break;
      }
      case 'idle':
      case 'sit':
        this.frame = this.idleFrame(t);
        if (this.state === 'sit' && this.wakePending && age > SIT_LOCK_MS) {
          this.setState('chase');
          break;
        }
        if (age > GROOM_AFTER_MS) this.setState('groom');
        break;
      case 'groom':
        this.frame = Math.floor(t / 260) % 3 === 0 ? 'sit1' : 'groom';
        if (age > SLEEP_AFTER_MS - GROOM_AFTER_MS) this.setState('sleep');
        break;
      case 'sleep':
        this.frame = Math.floor(t / 900) % 2 ? 'sleep1' : 'sleep2';
        break;
    }
    this.render();
  }

  /** Returns true once within `stop` px of the goal. */
  private moveToward(goal: { x: number; y: number }, dt: number, stop: number): boolean {
    const dx = goal.x - this.x;
    const dy = goal.y - this.y;
    const dist = Math.hypot(dx, dy);
    if (Math.abs(dx) > 2) this.facing = dx > 0 ? 1 : -1;
    if (dist <= stop) return true;
    if (this.reduceMotion) {
      this.x = goal.x;
      this.y = goal.y;
      return true;
    }
    // Ease in the last stretch so it doesn't slam to a stop.
    const step = Math.min(dist - stop, SPEED * dt * Math.min(1, 0.35 + dist / 220));
    this.x += (dx / dist) * step;
    this.y += (dy / dist) * step;
    return dist - step <= stop + 0.5;
  }

  private idleFrame(t: number): CatFrame {
    const cycle = t % 4200;
    if (cycle < 140) return 'blink';
    if (cycle > 2600 && cycle < 3300) return 'sit2';
    return 'sit1';
  }

  private pet(): void {
    this.say(['mrrp', 'meow', '♥'][Math.floor(Math.random() * 4)], 1200);
    for (let i = 0; i < 3; i++) {
      const h = document.createElement('span');
      h.className = 'os-heart';
      h.textContent = '♥';
      h.style.left = `${this.x - 6 + (i - 1) * 12}px`;
      h.style.top = `${this.y - H}px`;
      h.style.setProperty('--dx', `${(i - 1) * 10}px`);
      h.style.animationDelay = `${i * 90}ms`;
      (this.catRef.nativeElement.parentElement ?? document.body).appendChild(h);
      setTimeout(() => h.remove(), 1300);
    }
    if (this.state === 'sleep') this.setState(this.wasClickSit ? 'sit' : 'idle');
  }

  private say(text: string, ms: number): void {
    const b = this.bubbleRef?.nativeElement;
    if (!b) return;
    clearTimeout(this.bubbleTimer);
    b.textContent = text;
    b.classList.toggle('show', !!text);
    if (ms) this.bubbleTimer = setTimeout(() => b.classList.remove('show'), ms);
  }

  // ── geometry ─────────────────────────────────────────────────────────────

  /** Bottom-centre of the cat when it's sitting on the menu bar. */
  private perchPoint(): { x: number; y: number } {
    const el = document.querySelector('[data-cat-perch]');
    if (el) {
      const r = el.getBoundingClientRect();
      if (r.width) return { x: r.left + r.width / 2, y: r.bottom };
    }
    return { x: window.innerWidth - 80, y: 44 };
  }

  private clampPoint(x: number, y: number): { x: number; y: number } {
    return {
      x: Math.max(W / 2, Math.min(window.innerWidth - W / 2, x)),
      y: Math.max(H + 4, Math.min(window.innerHeight - 2, y)),
    };
  }

  private distToMouse(): number {
    return Math.hypot(this.mouse.x - this.x, this.mouse.y + H * 0.6 - this.y);
  }

  private hitsCat(px: number, py: number): boolean {
    return px > this.x - W / 2 && px < this.x + W / 2 && py > this.y - H && py < this.y;
  }

  // ── drawing ──────────────────────────────────────────────────────────────

  private prerender(): void {
    for (const name of Object.keys(CAT_FRAMES) as CatFrame[]) {
      for (const dir of [1, -1]) {
        const c = document.createElement('canvas');
        c.width = GRID_W;
        c.height = GRID_H;
        const ctx = c.getContext('2d')!;
        CAT_FRAMES[name].forEach((row, y) => {
          for (let x = 0; x < GRID_W; x++) {
            const color = PALETTE[row[x]];
            if (!color) continue;
            ctx.fillStyle = color;
            ctx.fillRect(dir === 1 ? x : GRID_W - 1 - x, y, 1, 1);
          }
        });
        this.frames.set(`${name}:${dir}`, c);
      }
    }
  }

  private render(): void {
    const el = this.catRef.nativeElement;
    el.style.transform = `translate3d(${Math.round(this.x - W / 2)}px, ${Math.round(this.y - H)}px, 0)`;
    const key = `${this.frame}:${this.facing}`;
    if (key === this.drawn) return;
    this.drawn = key;
    const ctx = this.canvasRef.nativeElement.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, this.w, this.h);
    ctx.drawImage(this.frames.get(key)!, 0, 0, this.w, this.h);
  }
}
