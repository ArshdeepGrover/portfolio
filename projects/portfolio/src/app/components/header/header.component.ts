import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@shared/services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private themeService = inject(ThemeService);
  isDarkMode = this.themeService.isDarkMode;
  isMobileMenuOpen = false;
  activeSection = 'hero';
  currentRoute = '';

  navItems = [
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certificates', href: '#certificates', id: 'certificates' },
    { label: 'Blogs', href: '#blogs', id: 'blogs' },
    { label: 'Contact', route: '/contact', id: 'contact' },
    { label: 'Links', url: 'https://links.arshdeepsingh.info?utm_source=portfolio&utm_medium=header&utm_campaign=navigation', id: 'links' },
  ];

  constructor(private router: Router) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  navigateOrScroll(item: any) {
    if (item.url) {
      window.location.href = item.url;
      this.closeMobileMenu();
    } else if (item.route) {
      this.router.navigate([item.route]);
      this.closeMobileMenu();
    } else if (item.href) {
      // If we're not on home page, navigate to home first
      if (this.currentRoute !== '/') {
        this.router.navigate(['/']).then(() => {
          setTimeout(() => this.scrollToSection(item.id), 100);
        });
      } else {
        this.scrollToSection(item.id);
      }
      this.closeMobileMenu();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Only track scroll sections when on home page
    if (this.currentRoute !== '/') return;

    const sections = [
      'hero',
      'experience',
      'skills',
      'projects',
      'certificates',
      'blogs',
    ];
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const offsetHeight = element.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
      this.closeMobileMenu();
    }
  }

  isActive(item: any): boolean {
    if (item.route) {
      return this.currentRoute === item.route;
    } else {
      return this.activeSection === item.id && this.currentRoute === '/';
    }
  }

  ngOnInit() {
    // Track current route
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    // Set initial route
    this.currentRoute = this.router.url;
  }
}
