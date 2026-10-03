import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { portfolioProjects } from '@shared/stores/projects.store';
import { CAT_NAME, OsService, PROFILE } from '../os.service';
import { OsThemeService } from '../theme.service';

interface ICommand {
  group: 'Go to' | 'Actions' | 'Projects' | 'Links';
  label: string;
  hint?: string;
  glyph: string;
  keywords?: string;
  run: () => void;
}

/** ⌘K / Ctrl K / "/" — jump anywhere, open any project, flip any switch. */
@Component({
  selector: 'os-command-palette',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (os.paletteOpen()) {
      <div class="scrim" (click)="close()" data-cat-ignore></div>
      <div class="panel" role="dialog" aria-modal="true" aria-label="Command palette" data-cat-ignore>
        <div class="input">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input #q type="text" [value]="query()" (input)="onInput(q.value)" (keydown)="onKey($event)"
            placeholder="Search sections, projects, actions…" aria-label="Search commands" autocomplete="off" spellcheck="false" />
          <kbd class="os-kbd">esc</kbd>
        </div>
        <ul class="list" role="listbox">
          @for (c of results(); track c.group + c.label; let i = $index) {
            @if (i === 0 || results()[i - 1].group !== c.group) {
              <li class="group" role="presentation">{{ c.group }}</li>
            }
            <li role="option" [attr.aria-selected]="i === cursor()" [class.sel]="i === cursor()"
              (mouseenter)="cursor.set(i)" (click)="exec(c)">
              <span class="g">{{ c.glyph }}</span>
              <span class="label">{{ c.label }}</span>
              @if (c.hint) { <span class="hint">{{ c.hint }}</span> }
            </li>
          } @empty {
            <li class="empty">No matches. Try "projects", "theme" or "null".</li>
          }
        </ul>
        <footer><span><kbd class="os-kbd">↑</kbd><kbd class="os-kbd">↓</kbd> move</span><span><kbd class="os-kbd">↵</kbd> open</span><span class="r">ArshdeepGrover</span></footer>
      </div>
    }
  `,
  styles: [
    `
      .scrim { position: fixed; inset: 0; z-index: 90; background: rgba(5,5,7,.5); backdrop-filter: blur(4px); animation: fade .15s; }
      .panel {
        position: fixed; z-index: 91; top: 14vh; left: 50%; transform: translateX(-50%); width: min(640px, calc(100vw - 24px));
        background: var(--surface); border: 1px solid var(--line-2); border-radius: 16px; box-shadow: var(--shadow), 0 40px 120px -20px rgba(0,0,0,.6);
        overflow: hidden; animation: pop .2s var(--ease);
      }
      @keyframes pop { from { opacity: 0; transform: translate(-50%, -8px) scale(.98); } }
      @keyframes fade { from { opacity: 0; } }
      .input { display: flex; align-items: center; gap: 12px; padding: 0 16px; height: 56px; border-bottom: 1px solid var(--line); }
      .input svg { width: 18px; height: 18px; fill: none; stroke: var(--muted); stroke-width: 2; stroke-linecap: round; }
      input { flex: 1; background: none; border: 0; outline: 0; color: var(--text); font: 400 16px var(--font-sans); }
      input::placeholder { color: var(--dim); }
      .list { list-style: none; margin: 0; padding: 6px; max-height: min(52vh, 440px); overflow: auto; }
      .group { font: 500 11px/1 var(--font-mono); color: var(--dim); text-transform: uppercase; letter-spacing: .08em; padding: 12px 10px 6px; }
      li[role="option"] { display: flex; align-items: center; gap: 12px; padding: 9px 10px; border-radius: 9px; cursor: pointer; color: var(--muted); }
      li.sel { background: var(--surface-3); color: var(--text); }
      .g { width: 26px; height: 26px; flex: none; display: grid; place-items: center; border-radius: 7px; background: var(--surface-2); border: 1px solid var(--line); font: 600 13px/1 var(--font-mono); color: var(--accent); }
      .label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 14.5px; }
      .hint { font: 500 11.5px/1 var(--font-mono); color: var(--dim); white-space: nowrap; }
      .empty { padding: 28px; text-align: center; color: var(--dim); font-size: 14px; }
      footer { display: flex; gap: 16px; padding: 10px 16px; border-top: 1px solid var(--line); font: 500 11.5px/1 var(--font-mono); color: var(--dim); }
      footer span { display: flex; align-items: center; gap: 4px; } footer .r { margin-left: auto; }
      @media (max-width: 560px) { .panel { top: 10px; } footer { display: none; } }
    `,
  ],
})
export class CommandPaletteComponent {
  @ViewChild('q') input?: ElementRef<HTMLInputElement>;
  readonly os = inject(OsService);
  private theme = inject(OsThemeService);

  readonly query = signal('');
  readonly cursor = signal(0);

  private readonly commands: ICommand[] = [
    ...this.os.sections.map<ICommand>((s) => ({
      group: 'Go to',
      label: s.label,
      hint: s.file,
      glyph: s.glyph,
      run: () => this.os.scrollTo(s.id),
    })),
    { group: 'Actions', label: 'Open terminal', hint: '`', glyph: '>_', keywords: 'shell console cli', run: () => this.os.toggleTerminal(true) },
    { group: 'Actions', label: 'Toggle light / dark theme', glyph: '◑', keywords: 'theme dark light mode', run: () => this.theme.toggle() },
    {
      group: 'Actions',
      label: `Let ${CAT_NAME} out / put ${CAT_NAME} away`,
      glyph: '🐈',
      keywords: `cat kitty neko pet toggle hide show ${CAT_NAME.toLowerCase()}`,
      run: () => {
        this.os.setCat(!this.os.catEnabled());
        this.os.notify(this.os.catEnabled() ? `${CAT_NAME} is back` : `${CAT_NAME} went for a nap`);
      },
    },
    { group: 'Actions', label: `Send ${CAT_NAME} back to the menu bar`, glyph: '⌂', keywords: `cat home perch ${CAT_NAME.toLowerCase()}`, run: () => this.os.catHome$.next() },
    { group: 'Actions', label: 'Copy email address', hint: PROFILE.email, glyph: '@', keywords: 'mail contact', run: () => this.os.copyEmail() },
    { group: 'Actions', label: 'Download résumé', hint: 'PDF', glyph: 'CV', keywords: 'resume cv pdf', run: () => window.open(PROFILE.resume, '_blank') },
    ...portfolioProjects.map<ICommand>((p) => ({
      group: 'Projects',
      label: p.title.replace(/^[^\w]+/, '').split(' - ')[0],
      hint: p.technologies.slice(0, 2).join(' · '),
      glyph: '▦',
      keywords: `${p.title} ${p.technologies.join(' ')}`,
      run: () => {
        const url = p.demoLink || p.githubUrl || p.liveUrl;
        url ? window.open(url, '_blank', 'noopener') : this.os.scrollTo('projects');
      },
    })),
    ...(
      [
        ['GitHub', PROFILE.links.github],
        ['LinkedIn', PROFILE.links.linkedin],
        ['Blog: blogs.arshdeepgrover.dev', PROFILE.links.blogs],
        // ['Studio — freelance work', PROFILE.links.studio],
        ['Medium', PROFILE.links.medium],
        ['Book a 1:1 on Topmate', PROFILE.links.topmate],
      ] as const
    ).map<ICommand>(([label, url]) => ({ group: 'Links', label, glyph: '↗', run: () => window.open(url, '_blank', 'noopener') })),
  ];

  readonly results = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.commands.filter((c) => c.group !== 'Projects');
    const terms = q.split(/\s+/);
    return this.commands.filter((c) => {
      const hay = `${c.group} ${c.label} ${c.hint ?? ''} ${c.keywords ?? ''}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  });

  constructor() {
    effect(() => {
      if (this.os.paletteOpen()) {
        this.query.set('');
        this.cursor.set(0);
        setTimeout(() => this.input?.nativeElement.focus());
      }
    }, { allowSignalWrites: true });
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKey(e: KeyboardEvent): void {
    const typing = /INPUT|TEXTAREA|SELECT/.test((e.target as HTMLElement)?.tagName) || (e.target as HTMLElement)?.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.os.togglePalette();
    } else if (!typing && e.key === '/') {
      e.preventDefault();
      this.os.togglePalette(true);
    } else if (!typing && e.key === '`') {
      e.preventDefault();
      this.os.toggleTerminal();
    } else if (e.key === 'Escape' && this.os.paletteOpen()) {
      this.close();
    }
  }

  onInput(v: string): void {
    this.query.set(v);
    this.cursor.set(0);
  }

  onKey(e: KeyboardEvent): void {
    const n = this.results().length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.cursor.set((this.cursor() + 1) % Math.max(n, 1));
      this.scrollSel();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.cursor.set((this.cursor() - 1 + n) % Math.max(n, 1));
      this.scrollSel();
    } else if (e.key === 'Enter') {
      const c = this.results()[this.cursor()];
      if (c) this.exec(c);
    }
  }

  exec(c: ICommand): void {
    this.close();
    setTimeout(() => c.run(), 10);
  }

  close(): void {
    this.os.togglePalette(false);
  }

  private scrollSel(): void {
    setTimeout(() => document.querySelector('os-command-palette li.sel')?.scrollIntoView({ block: 'nearest' }));
  }
}
