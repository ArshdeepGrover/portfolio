import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { OsService, PROFILE } from '../os.service';
import { OsThemeService } from '../theme.service';

/**
 * Top menu bar. Brand on the left, section menu in the middle, system tray on
 * the right: availability, search, terminal, theme, Delhi clock. The cat's
 * cushion lives in the tray; that's where it sits until you move the mouse.
 */
@Component({
  selector: 'os-menu-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="bar" aria-label="Main">
      <button type="button" class="brand" (click)="os.scrollTo('hero')" aria-label="Back to top">
        <span class="logo" aria-hidden="true"><i></i></span>
        <span class="brand-name">arsh<b>OS</b></span>
      </button>

      <ul class="menu">
        @for (s of menu; track s.id) {
          <li>
            <a [href]="'#' + s.id" [class.on]="os.activeSection() === s.id" (click)="go($event, s.id)">{{ s.label }}</a>
          </li>
        }
      </ul>

      <div class="tray">
        <span class="status" title="Open to workshops, mentoring and freelance work">
          <i class="dot"></i>Open to workshops
        </span>
        <button type="button" class="search" (click)="os.togglePalette(true)" aria-label="Open command palette">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <span class="search-label">Search</span>
          <kbd class="os-kbd">{{ mod }}K</kbd>
        </button>
        <span class="perch" data-cat-perch [class.empty]="!os.catEnabled()" title="The cat's spot">
          <i class="cushion"></i>
        </span>
        <button type="button" class="icon" (click)="os.toggleTerminal()" aria-label="Open terminal" title="Terminal ( \` )">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 7 5 5-5 5M13 17h6"/></svg>
        </button>
        <button type="button" class="icon" (click)="theme.toggle()" [attr.aria-label]="theme.dark() ? 'Switch to light theme' : 'Switch to dark theme'">
          @if (theme.dark()) {
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          } @else {
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
          }
        </button>
        <time class="clock" [attr.title]="'Local time in ' + PROFILE.location">{{ clock() }}</time>
      </div>
    </nav>
  `,
  styles: [
    `
      :host { position: fixed; inset: 0 0 auto; z-index: 60; }
      .bar {
        height: var(--bar-h); display: flex; align-items: center; gap: 18px; padding: 0 14px 0 10px;
        background: color-mix(in srgb, var(--bg) 72%, transparent);
        backdrop-filter: saturate(1.6) blur(18px); -webkit-backdrop-filter: saturate(1.6) blur(18px);
        border-bottom: 1px solid var(--line);
      }
      button { background: none; border: 0; color: inherit; font: inherit; cursor: pointer; }
      .brand { display: flex; align-items: center; gap: 9px; padding: 6px; border-radius: 8px; }
      .brand:hover { background: var(--surface-2); }
      .logo { width: 20px; height: 20px; border-radius: 50%; background: var(--accent); display: grid; place-items: center; }
      .logo i { width: 8px; height: 8px; border-radius: 50%; background: var(--bg); transition: transform .4s var(--ease); }
      .brand:hover .logo i { transform: translateX(3px); }
      .brand-name { font: 600 14px/1 var(--font-sans); letter-spacing: -.01em; }
      .brand-name b { color: var(--accent); font-weight: 700; }
      .menu { display: flex; gap: 2px; list-style: none; margin: 0; padding: 0; }
      .menu a { display: block; padding: 6px 10px; border-radius: 7px; font-size: 13.5px; color: var(--muted); transition: color .2s, background .2s; }
      .menu a:hover { color: var(--text); background: var(--surface-2); }
      .menu a.on { color: var(--text); background: var(--surface-3); }
      .tray { margin-left: auto; display: flex; align-items: center; gap: 6px; }
      .status { display: flex; align-items: center; gap: 7px; font: 500 12px/1 var(--font-mono); color: var(--muted); margin-right: 6px; }
      .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--ok); box-shadow: 0 0 0 0 var(--ok); animation: ping 2.4s infinite; }
      @keyframes ping { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--ok) 60%, transparent); } 80%,100% { box-shadow: 0 0 0 7px transparent; } }
      .search {
        display: flex; align-items: center; gap: 8px; height: 30px; padding: 0 6px 0 10px; border-radius: 8px;
        border: 1px solid var(--line-2); background: var(--surface); color: var(--muted); font-size: 13px;
      }
      .search:hover { color: var(--text); border-color: var(--dim); }
      svg { width: 16px; height: 16px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
      .icon { width: 32px; height: 32px; display: grid; place-items: center; border-radius: 8px; color: var(--muted); }
      .icon:hover { color: var(--text); background: var(--surface-2); }
      .perch { width: 56px; height: var(--bar-h); position: relative; flex: none; }
      .cushion {
        position: absolute; left: 50%; bottom: 3px; width: 44px; height: 9px; transform: translateX(-50%);
        border-radius: 50%; background: var(--surface-3); border: 1px solid var(--line-2);
      }
      .clock { font: 500 12.5px/1 var(--font-mono); color: var(--muted); padding-left: 6px; font-variant-numeric: tabular-nums; white-space: nowrap; }
      @media (max-width: 1180px) { .status { display: none; } }
      @media (max-width: 980px) { .menu { display: none; } }
      @media (max-width: 560px) {
        .search-label, .search kbd, .clock { display: none; }
        .search { width: 32px; padding: 0; justify-content: center; border: 0; background: none; }
        .bar { gap: 8px; }
      }
    `,
  ],
})
export class MenuBarComponent {
  readonly os = inject(OsService);
  readonly theme = inject(OsThemeService);
  readonly PROFILE = PROFILE;
  readonly menu = this.os.sections.filter((s) => s.id !== 'hero' && s.id !== 'certificates');
  readonly mod = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘' : 'Ctrl ';

  private now = signal(new Date());
  readonly clock = computed(() =>
    new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
      .format(this.now())
      .replace(/,/g, ''),
  );

  constructor() {
    const id = setInterval(() => this.now.set(new Date()), 15000);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  go(e: Event, id: string): void {
    e.preventDefault();
    this.os.scrollTo(id);
  }
}
