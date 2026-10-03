import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';

export interface IOsSection {
  id: string;
  label: string;
  /** File-ish name shown in window title bars and the menu bar. */
  file: string;
  /** Single glyph used by the dock and command palette. */
  glyph: string;
  /** Keyboard hint shown in the command palette. */
  key: string;
}

/** Order matches the page. Ids are the URL fragments, so old links keep working. */
export const OS_SECTIONS: IOsSection[] = [
  { id: 'hero', label: 'Desktop', file: '~', glyph: '⌂', key: '0' },
  { id: 'about', label: 'About', file: 'about.md', glyph: '◐', key: '1' },
  { id: 'experience', label: 'Experience', file: 'git log', glyph: '⎇', key: '2' },
  { id: 'projects', label: 'Projects', file: 'projects/', glyph: '▦', key: '3' },
  { id: 'skills', label: 'Skills', file: 'package.json', glyph: '{}', key: '4' },
  { id: 'community', label: 'Community', file: 'calendar', glyph: '◷', key: '5' },
  { id: 'blogs', label: 'Writing', file: 'feed.rss', glyph: '¶', key: '6' },
  { id: 'certificates', label: 'Certificates', file: 'certs/', glyph: '✦', key: '7' },
  { id: 'contact', label: 'Contact', file: 'mail', glyph: '✉', key: '8' },
];

export const PROFILE = {
  name: 'Arshdeep Singh',
  handle: 'arshdeep',
  email: 'arshdeepgroverdev@gmail.com',
  role: 'Training Delivery Specialist',
  company: 'Google Operations Center',
  location: 'Delhi NCR, India',
  resume: '/resume/Arshdeep_Singh_SoftwareDeveloper_Resume.pdf',
  links: {
    github: 'https://github.com/ArshdeepGrover',
    linkedin: 'https://linkedin.com/in/ArshdeepGrover',
    medium: 'https://medium.com/@ArshdeepGrover',
    x: 'https://x.com/ArshdeepGroverS',
    devto: 'https://dev.to/arshdeepgrover',
    topmate: 'https://topmate.io/arshdeepgrover',
    blogs: 'https://blogs.arshdeepgrover.dev?utm_source=portfolio&utm_medium=os&utm_campaign=navigation',
    studio: 'https://studio.arshdeepgrover.dev?utm_source=portfolio&utm_medium=os&utm_campaign=navigation',
  },
};

function readFlag(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === '1';
  } catch {
    return fallback;
  }
}

function writeFlag(key: string, value: boolean): void {
  try {
    localStorage.setItem(key, value ? '1' : '0');
  } catch {
    /* storage unavailable: setting just won't persist */
  }
}

/**
 * Shared UI state for the OS shell: which section is in view, which overlays
 * are open, and whether the cat is out. Everything is a signal so the menu
 * bar, dock and palette stay in sync without wiring them together.
 */
@Injectable({ providedIn: 'root' })
export class OsService {
  readonly sections = OS_SECTIONS;
  readonly activeSection = signal<string>('hero');
  readonly paletteOpen = signal(false);
  readonly terminalOpen = signal(false);
  readonly catEnabled = signal(readFlag('os.cat', true));

  /** Fired when something asks the cat to go back to the menu bar. */
  readonly catHome$ = new Subject<void>();
  /** Fired when the cat should react (e.g. `pet` in the terminal). */
  readonly catPet$ = new Subject<void>();

  private toastTimer?: ReturnType<typeof setTimeout>;
  readonly toast = signal<string | null>(null);

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', id === 'hero' ? location.pathname : `#${id}`);
  }

  togglePalette(force?: boolean): void {
    this.paletteOpen.set(force ?? !this.paletteOpen());
    if (this.paletteOpen()) this.terminalOpen.set(false);
  }

  toggleTerminal(force?: boolean): void {
    this.terminalOpen.set(force ?? !this.terminalOpen());
    if (this.terminalOpen()) this.paletteOpen.set(false);
  }

  setCat(enabled: boolean): void {
    this.catEnabled.set(enabled);
    writeFlag('os.cat', enabled);
  }

  notify(message: string): void {
    this.toast.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 2400);
  }

  async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.notify('Email copied to clipboard');
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }
}
