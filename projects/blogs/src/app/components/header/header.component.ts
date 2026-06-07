import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isScrolled = false;
  themeService = inject(ThemeService);

  get isDark() {
    return this.themeService.isDarkMode();
  }

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 20; }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
