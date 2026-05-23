import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FragmentService {
  private observer: IntersectionObserver | null = null;
  private sections: { id: string; element: Element }[] = [];

  constructor(private router: Router) {}

  initializeFragmentNavigation(): void {
    // Wait for DOM to be ready
    setTimeout(() => {
      this.setupSections();
      this.setupIntersectionObserver();
    }, 1000);
  }

  private setupSections(): void {
    const sectionIds = [
      'experience',
      'skills', 
      'projects',
      'certificates',
      'community',
      'blogs'
    ];

    this.sections = sectionIds
      .map(id => {
        const element = document.getElementById(id);
        return element ? { id, element } : null;
      })
      .filter(section => section !== null) as { id: string; element: Element }[];
  }

  private setupIntersectionObserver(): void {
    if (this.observer) {
      this.observer.disconnect();
    }

    const options = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          this.updateUrlFragment(sectionId);
        }
      });
    }, options);

    // Observe all sections
    this.sections.forEach(section => {
      this.observer?.observe(section.element);
    });
  }

  private updateUrlFragment(fragmentId: string): void {
    // Update URL without triggering navigation
    const url = this.router.url.split('#')[0];
    const newUrl = `${url}#${fragmentId}`;
    
    // Use replaceState to update URL without adding to history
    window.history.replaceState(null, '', newUrl);
  }

  scrollToFragment(fragmentId: string): void {
    const element = document.getElementById(fragmentId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}