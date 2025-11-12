import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;
  isMobileMenuOpen = false;
  activeSection = 'hero';
  isOnHomePage = true;

  navItems = [
    { label: 'Experience', href: '#experience', id: 'experience', route: '/' },
    { label: 'Skills', href: '#skills', id: 'skills', route: '/' },
    { label: 'Projects', href: '#projects', id: 'projects', route: '/' },
    {
      label: 'Certificates',
      href: '#certificates',
      id: 'certificates',
      route: '/',
    },
    { label: 'Blogs', href: '#blogs', id: 'blogs', route: '/' },
    { label: 'Blog', href: '/blog', id: 'blog', route: '/blog' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }

    // Track current route
    this.checkCurrentRoute();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkCurrentRoute();
      });
  }

  checkCurrentRoute() {
    this.isOnHomePage =
      this.router.url === '/' || this.router.url.startsWith('/#');
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
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
    // If clicking "Blog", navigate to blog page
    if (sectionId === 'blog') {
      this.router.navigate(['/blog']);
      this.closeMobileMenu();
      return;
    }

    // If not on home page, navigate to home first
    if (!this.isOnHomePage) {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
      this.closeMobileMenu();
      return;
    }

    // If on home page, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.activeSection = sectionId;
      this.closeMobileMenu();
    }
  }

  isActive(sectionId: string): boolean {
    if (sectionId === 'blog') {
      return this.router.url.startsWith('/blog');
    }
    return this.activeSection === sectionId;
  }

  navigateHome() {
    this.router.navigate(['/']);
    this.closeMobileMenu();
  }
}
