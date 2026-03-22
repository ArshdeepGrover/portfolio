import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '@shared/services/theme.service';

interface NavItem {
  label: string;
  section?: string;
  route?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;
  isMobileMenuOpen = false;
  isScrolled = false;

  navItems: NavItem[] = [
    { label: 'Home', section: 'hero' },
    { label: 'Services', section: 'services' },
    { label: 'Work', section: 'portfolio' },
    { label: 'Process', section: 'process' },
    { label: 'About', section: 'about' },
    { label: 'Contact', route: '/contact' },
  ];

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  navigateOrScroll(item: NavItem) {
    this.isMobileMenuOpen = false;
    if (item.route) {
      this.router.navigate([item.route]);
    } else if (item.section) {
      if (this.router.url !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.scrollToSection(item.section!), 100);
        });
      } else {
        this.scrollToSection(item.section);
      }
    }
  }

  private scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
