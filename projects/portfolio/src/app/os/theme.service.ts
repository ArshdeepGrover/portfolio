import { Injectable, effect, signal } from '@angular/core';

/**
 * Portfolio theme. Dark-first: visitors get "midnight" unless they've
 * switched to "paper" before. Shares the `theme` storage key with the old
 * shared ThemeService so an existing choice carries over.
 */
@Injectable({ providedIn: 'root' })
export class OsThemeService {
  private readonly KEY = 'theme';
  readonly dark = signal(this.initial());

  constructor() {
    effect(() => {
      const dark = this.dark();
      const html = document.documentElement;
      html.classList.toggle('dark', dark);
      html.classList.toggle('light', !dark);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0a0a0c' : '#f3f0e9');
      try {
        localStorage.setItem(this.KEY, dark ? 'dark' : 'light');
      } catch {
        /* not persisted */
      }
    });
  }

  toggle(): void {
    this.dark.update((d) => !d);
  }

  private initial(): boolean {
    try {
      return localStorage.getItem(this.KEY) !== 'light';
    } catch {
      return true;
    }
  }
}
