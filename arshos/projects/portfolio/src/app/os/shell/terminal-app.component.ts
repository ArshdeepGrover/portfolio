import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { experiences } from '@stores/experience_store';
import { skillCategories } from '@stores/skills_store';
import { portfolioProjects } from '@shared/stores/projects.store';
import { OsService, PROFILE } from '../os.service';
import { OsThemeService } from '../theme.service';

interface ILine {
  text: string;
  cls?: 'cmd' | 'ok' | 'err' | 'dim' | 'acc' | 'head';
  href?: string;
}

const BIO =
  'Full-stack developer, four years in Angular and Ruby on Rails. Joined Commudle as an intern in 2022 and left as lead developer. ' +
  'Since August 2026, Training Delivery Specialist at Google Operations Center: still technical work, pointed at helping people learn.';

/** A small, honest shell. `help` lists everything. */
@Component({
  selector: 'os-terminal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (os.terminalOpen()) {
      <section class="term" role="dialog" aria-label="Terminal" data-cat-ignore (click)="focus()">
        <header>
          <div class="lights">
            <button type="button" class="l r" (click)="os.toggleTerminal(false)" aria-label="Close terminal"></button>
            <span class="l y"></span><span class="l g"></span>
          </div>
          <span class="t">arshdeep&#64;arshos: ~ — zsh</span>
        </header>
        <div class="out" #out>
          @for (l of lines(); track $index) {
            @if (l.href) {
              <a class="line {{ l.cls }}" [href]="l.href" target="_blank" rel="noopener">{{ l.text }}</a>
            } @else {
              <div class="line {{ l.cls }}">{{ l.text }}</div>
            }
          }
          <label class="prompt">
            <span class="ps"><b>arshdeep</b>&#64;arshos <i>~</i> %</span>
            <input #inp type="text" [value]="draft()" (input)="draft.set(inp.value)" (keydown)="onKey($event)"
              aria-label="Terminal input" autocomplete="off" autocapitalize="off" spellcheck="false" />
          </label>
        </div>
      </section>
    }
  `,
  styles: [
    `
      .term {
        position: fixed; z-index: 85; right: 20px; bottom: 84px; width: min(620px, calc(100vw - 24px)); height: min(440px, 62vh);
        display: flex; flex-direction: column; border-radius: 14px; overflow: hidden;
        background: rgba(12, 12, 14, .94); color: #e9e6df; border: 1px solid rgba(255,255,255,.12);
        backdrop-filter: blur(16px); box-shadow: 0 30px 90px -20px rgba(0,0,0,.7); animation: up .22s var(--ease);
        font: 13px/1.6 var(--font-mono);
      }
      @keyframes up { from { opacity: 0; transform: translateY(12px) scale(.98); } }
      header { height: 36px; flex: none; display: flex; align-items: center; padding: 0 12px; border-bottom: 1px solid rgba(255,255,255,.08); position: relative; }
      .lights { display: flex; gap: 7px; }
      .l { width: 12px; height: 12px; border-radius: 50%; border: 0; padding: 0; display: block; }
      .r { background: #ff5f57; cursor: pointer; } .y { background: #febc2e; } .g { background: #28c840; }
      .t { position: absolute; left: 50%; transform: translateX(-50%); color: #8d8a83; font-size: 12px; white-space: nowrap; }
      .out { flex: 1; overflow: auto; padding: 12px 14px 16px; }
      .line { white-space: pre-wrap; word-break: break-word; min-height: 1.6em; display: block; }
      .cmd { color: #e9e6df; } .cmd::before { content: '› '; color: #ff7955; }
      .ok { color: #5fd88f; } .err { color: #ff6159; } .dim { color: #7d7a73; } .acc { color: #ff9b7d; }
      .head { color: #ffffff; font-weight: 600; margin-top: 6px; }
      a.line { color: #7cc7f5; text-decoration: underline; text-underline-offset: 3px; }
      .prompt { display: flex; gap: 8px; align-items: center; margin-top: 4px; }
      .ps { white-space: nowrap; color: #8d8a83; } .ps b { color: #5fd88f; font-weight: 500; } .ps i { color: #7cc7f5; font-style: normal; }
      input { flex: 1; min-width: 0; background: none; border: 0; outline: 0; color: #fff; font: inherit; caret-color: #ff7955; }
      @media (max-width: 720px) { .term { right: 12px; bottom: 72px; height: 56vh; } }
    `,
  ],
})
export class TerminalAppComponent implements AfterViewChecked {
  @ViewChild('out') out?: ElementRef<HTMLDivElement>;
  @ViewChild('inp') inp?: ElementRef<HTMLInputElement>;

  readonly os = inject(OsService);
  private theme = inject(OsThemeService);

  readonly draft = signal('');
  readonly lines = signal<ILine[]>([
    { text: 'arshOS 26.10 — last login: just now', cls: 'dim' },
    { text: "Type 'help' to see what this shell can do.", cls: 'dim' },
  ]);
  private history: string[] = [];
  private hIdx = -1;
  private stick = true;

  private readonly commands: Record<string, string> = {
    help: 'list commands',
    whoami: 'one-line intro',
    about: 'the longer version',
    experience: 'work history (alias: work)',
    projects: 'things I have built',
    skills: 'what I work with',
    contact: 'how to reach me',
    socials: 'links elsewhere',
    resume: 'open the résumé PDF',
    open: 'open <section>  e.g. open projects',
    theme: 'toggle light / dark',
    cat: "cat <file> to read one, or just 'cat' to call the cat",
    pet: 'pet the cat',
    ls: 'list files',
    clear: 'clear the screen',
    exit: 'close the terminal',
  };

  constructor() {
    effect(() => {
      if (this.os.terminalOpen()) setTimeout(() => this.focus());
    });
  }

  ngAfterViewChecked(): void {
    if (this.stick && this.out) {
      this.out.nativeElement.scrollTop = this.out.nativeElement.scrollHeight;
      this.stick = false;
    }
  }

  focus(): void {
    if (!window.getSelection()?.toString()) this.inp?.nativeElement.focus();
  }

  onKey(e: KeyboardEvent): void {
    if (e.key === 'Enter') {
      const raw = (this.inp?.nativeElement.value ?? this.draft()).trim();
      this.setDraft('');
      this.print({ text: raw, cls: 'cmd' });
      if (raw) {
        this.history.unshift(raw);
        this.hIdx = -1;
        this.run(raw);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.hIdx = Math.min(this.hIdx + 1, this.history.length - 1);
      this.setDraft(this.history[this.hIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.hIdx = Math.max(this.hIdx - 1, -1);
      this.setDraft(this.hIdx === -1 ? '' : this.history[this.hIdx]);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const d = this.inp?.nativeElement.value ?? '';
      const hit = Object.keys(this.commands).find((c) => c.startsWith(d) && d);
      if (hit) this.setDraft(hit + ' ');
    } else if (e.key === 'Escape') {
      this.os.toggleTerminal(false);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      this.lines.set([]);
    }
  }

  private setDraft(v: string): void {
    this.draft.set(v);
    if (this.inp) this.inp.nativeElement.value = v;
  }

  private print(...l: ILine[]): void {
    this.lines.update((cur) => [...cur, ...l].slice(-400));
    this.stick = true;
  }

  private run(raw: string): void {
    const [cmd, ...args] = raw.split(/\s+/);
    const arg = args.join(' ').toLowerCase();
    switch (cmd.toLowerCase()) {
      case 'help':
        this.print(
          { text: 'Commands', cls: 'head' },
          ...Object.entries(this.commands).map(([k, v]) => ({ text: `  ${k.padEnd(12)}${v}`, cls: 'dim' as const })),
        );
        break;
      case 'whoami':
        this.print({ text: `${PROFILE.name} — ${PROFILE.role} @ ${PROFILE.company}. Full-stack dev (Angular, Rails). ${PROFILE.location}.` });
        break;
      case 'about':
        this.print({ text: BIO });
        break;
      case 'work':
      case 'experience':
        this.print({ text: 'git log --oneline', cls: 'head' });
        for (const x of experiences) {
          const y = (d: string | null) => (d ? d.slice(0, 4) : 'now');
          this.print({ text: `  ${y(x.startDate)}–${y(x.endDate)}  ${x.role}, ${x.company}`, cls: x.endDate ? undefined : 'acc' });
        }
        break;
      case 'projects':
        for (const p of portfolioProjects) {
          const url = p.demoLink || p.githubUrl;
          this.print(url ? { text: `  ↗ ${p.title.replace(/^[^\w]+/, '')}`, href: url } : { text: `  · ${p.title}` });
        }
        break;
      case 'skills':
        for (const c of skillCategories) {
          this.print({ text: c.name, cls: 'head' }, { text: '  ' + c.skills.map((s) => s.name).join(', '), cls: 'dim' });
        }
        break;
      case 'contact':
        this.print({ text: `  email     ${PROFILE.email}`, href: `mailto:${PROFILE.email}` }, { text: '  or scroll to the mail window: open contact', cls: 'dim' });
        break;
      case 'socials':
        Object.entries(PROFILE.links).forEach(([k, v]) => this.print({ text: `  ${k.padEnd(10)}${v.split('?')[0]}`, href: v }));
        break;
      case 'resume':
        window.open(PROFILE.resume, '_blank');
        this.print({ text: 'Opening résumé…', cls: 'ok' });
        break;
      case 'open':
      case 'cd': {
        const s = this.os.sections.find((x) => x.id === arg || x.label.toLowerCase() === arg || x.file.replace(/\W/g, '') === arg.replace(/\W/g, ''));
        if (s) {
          this.os.scrollTo(s.id);
          this.print({ text: `→ ${s.label}`, cls: 'ok' });
        } else {
          this.print({ text: `no such section: ${arg || '(none)'}. Try: ${this.os.sections.map((x) => x.id).join(', ')}`, cls: 'err' });
        }
        break;
      }
      case 'ls':
        this.print({ text: 'about.md  experience.log  projects/  package.json  calendar.ics  certs/  feed.rss  resume.pdf', cls: 'acc' });
        break;
      case 'pwd':
        this.print({ text: '/Users/arshdeep' });
        break;
      case 'date':
        this.print({ text: new Date().toString() });
        break;
      case 'theme':
        this.theme.toggle();
        this.print({ text: `theme: ${this.theme.dark() ? 'midnight' : 'paper'}`, cls: 'ok' });
        break;
      case 'cat':
        if (!arg) {
          this.os.setCat(true);
          this.os.catHome$.next();
          this.print({ text: 'pspspsps… the cat is heading to the menu bar.', cls: 'ok' });
        } else if (arg.startsWith('about')) {
          this.print({ text: BIO });
        } else if (arg.startsWith('resume')) {
          this.print({ text: 'Binary file. Try: resume', cls: 'dim' });
        } else {
          this.print({ text: `cat: ${arg}: No such file or directory`, cls: 'err' });
        }
        break;
      case 'pet':
        this.os.setCat(true);
        this.os.catPet$.next();
        this.print({ text: 'Null.', cls: 'acc' });
        break;
      case 'sudo':
        this.print(
          arg.includes('hire')
            ? { text: `Permission granted. Email ${PROFILE.email} and say hi.`, cls: 'ok' }
            : { text: 'arshdeep is not in the sudoers file. This incident will be reported.', cls: 'err' },
        );
        break;
      case 'echo':
        this.print({ text: args.join(' ') });
        break;
      case 'clear':
        this.lines.set([]);
        break;
      case 'exit':
        this.os.toggleTerminal(false);
        break;
      default:
        this.print({ text: `zsh: command not found: ${cmd}. Try 'help'.`, cls: 'err' });
    }
  }
}
