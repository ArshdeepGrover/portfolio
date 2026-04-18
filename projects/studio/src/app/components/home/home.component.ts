import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ProcessComponent } from '../process/process.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ServicesComponent,
    PortfolioComponent,
    ProcessComponent,
    TestimonialsComponent,
    AboutComponent,
    ContactComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  private route = inject(ActivatedRoute);

  ngAfterViewInit() {
    this.initializeAnimations();

    // If navigated to /#section, scroll to that section.
    this.route.fragment.subscribe((fragment) => {
      if (!fragment) return;
      setTimeout(() => {
        const el = document.getElementById(fragment);
        if (!el) return;
        el.classList.add('animate-fade-in');
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    });
  }

  private initializeAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el) => observer.observe(el));
  }
}
