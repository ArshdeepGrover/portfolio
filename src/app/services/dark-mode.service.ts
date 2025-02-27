import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeClass = 'dark';

  constructor() {
    this.initializeTheme();
  }

  initializeTheme(): void {
    const isDark = localStorage.getItem('theme') === 'dark';
    this.toggleDarkMode(isDark);
  }

  toggleDarkMode(enable: boolean): void {
    const root = document.documentElement; // <html> element
    if (enable) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  isDarkMode(): boolean {
    return document.documentElement.classList.contains(this.darkModeClass);
  }
}
