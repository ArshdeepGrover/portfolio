import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosService {
  private observer?: IntersectionObserver;

  init() {
    if (typeof window === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all elements with data-aos attribute
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach((el) => this.observer?.observe(el));
  }

  refresh() {
    if (!this.observer) return;
    
    // Re-observe new elements
    const elements = document.querySelectorAll('[data-aos]:not(.animate-in)');
    elements.forEach((el) => this.observer?.observe(el));
  }

  destroy() {
    this.observer?.disconnect();
  }
}