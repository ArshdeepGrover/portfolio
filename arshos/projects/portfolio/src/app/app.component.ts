import { AfterViewInit, Component, DestroyRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MenuBarComponent } from './os/shell/menu-bar.component';
import { DockComponent } from './os/shell/dock.component';
import { CommandPaletteComponent } from './os/shell/command-palette.component';
import { TerminalAppComponent } from './os/shell/terminal-app.component';
import { BootComponent } from './os/shell/boot.component';
import { CatComponent } from './os/cat/cat.component';
import { OsService } from './os/os.service';
import { OsThemeService } from './os/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MenuBarComponent,
    DockComponent,
    CommandPaletteComponent,
    TerminalAppComponent,
    BootComponent,
    CatComponent,
  ],
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <os-boot />
    <os-menu-bar />
    <main id="main"><router-outlet /></main>
    <os-dock />
    <os-command-palette />
    <os-terminal />
    <os-cat />
    @if (os.toast(); as t) {
      <div class="toast" role="status">{{ t }}</div>
    }
  `,
  styles: [
    `
      main { display: block; padding-top: var(--bar-h); padding-bottom: 96px; }
      .skip { position: fixed; left: 12px; top: -60px; z-index: 300; background: var(--accent); color: var(--accent-ink); padding: 8px 12px; border-radius: 8px; font-weight: 600; }
      .skip:focus { top: 8px; }
      .toast {
        position: fixed; left: 50%; bottom: 92px; transform: translateX(-50%); z-index: 95;
        font: 500 13px/1 var(--font-sans); color: var(--text); background: var(--surface); border: 1px solid var(--line-2);
        padding: 11px 16px; border-radius: 999px; box-shadow: var(--shadow); animation: t .25s var(--ease);
      }
      @keyframes t { from { opacity: 0; transform: translate(-50%, 8px); } }
    `,
  ],
})
export class AppComponent implements AfterViewInit {
  readonly os = inject(OsService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  constructor() {
    inject(OsThemeService); // applies the saved theme immediately
  }

  ngAfterViewInit(): void {
    const sub = this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      setTimeout(() => this.watchSections(), 50);
      const frag = this.router.parseUrl(this.router.url).fragment;
      if (frag) setTimeout(() => document.getElementById(frag)?.scrollIntoView(), 120);
    });
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }

  private io?: IntersectionObserver;

  /** Scroll-spy: the section crossing the upper third of the screen is "active". */
  private watchSections(): void {
    this.io?.disconnect();
    this.io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) this.os.activeSection.set(e.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    for (const s of this.os.sections) {
      const el = document.getElementById(s.id);
      if (el) this.io.observe(el);
    }
  }
}
