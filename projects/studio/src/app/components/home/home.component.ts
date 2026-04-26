import { Component, AfterViewInit, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroComponent } from '../hero/hero.component';
import { ServicesComponent } from '../services/services.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { ProcessComponent } from '../process/process.component';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { SeoService } from '@shared/services/seo.service';
import { CONTACT_INFO } from '@stores/contact_store';

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
export class HomeComponent implements AfterViewInit, OnInit {

  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateTitle('Arshdeep Studio | Premium Web & Product Design');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Premium design studio focused on building high-fidelity digital products, intuitive UX, and memorable brand identities. Let’s build something amazing together.' },
      { name: 'keywords', content: 'Web Design, Product Design, UI/UX Design, Brand Identity, Arshdeep Studio, Digital Experience' },
      { property: 'og:title', content: 'Arshdeep Studio | Premium Web & Product Design' },
      { property: 'og:description', content: 'We craft beautiful, high-performing digital experiences from concept to launch.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://arshdeepgrover.dev/studio' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]);

    this.seoService.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      'name': 'Arshdeep Studio',
      'image': 'https://arshdeepgrover.dev/assets/about-studio.png',
      'url': 'https://arshdeepgrover.dev/studio',
      'email': CONTACT_INFO.email,
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'IN'
      },
      'sameAs': CONTACT_INFO.socials.map(s => s.url)
    }, 'studio-org-schema');
  }


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
