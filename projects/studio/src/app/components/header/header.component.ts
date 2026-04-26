import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ThemeService } from '@shared/services/theme.service';
import { CONTACT_INFO } from '@stores/contact_store';

interface NavItem {
  label: string;
  /** Fragment id on the home page (e.g. 'services' -> /#services). */
  section?: string;
  /** Internal Angular route (e.g. '/start-project'). */
  route?: string;
  /** External URL opened in a new tab. */
  external?: string;
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

  readonly contact = CONTACT_INFO;

  navItems: NavItem[] = [
    { label: 'Home', section: 'hero' },
    { label: 'Services', section: 'services' },
    { label: 'Portfolio', section: 'portfolio' },
    { label: 'Process', section: 'process' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' },
    { label: 'Links', external: CONTACT_INFO.linksHub },
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

    if (item.external) {
      window.open(item.external, '_blank', 'noopener');
      return;
    }

    if (item.route) {
      this.router.navigate([item.route]);
      return;
    }

    if (item.section) {
      if (this.router.url.split('#')[0].split('?')[0] !== '/') {
        // Navigate to home first, then scroll once it’s mounted.
        this.router.navigate(['/'], { fragment: item.section });
      } else {
        // Already on home — update the URL fragment and scroll.
        this.router.navigate([], {
          fragment: item.section,
          queryParamsHandling: 'preserve',
          replaceUrl: false,
        });
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
