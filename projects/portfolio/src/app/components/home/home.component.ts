import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificatesComponent } from '../certificates/certificates.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { CommunityComponent } from '../community/community.component';
import { CameraDrawingComponent } from '../camera-drawing/camera-drawing.component';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    CertificatesComponent,
    BlogsComponent,
    CommunityComponent,
    CameraDrawingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateTitle('Arshdeep Singh | Lead Software Developer & UI/UX Specialist');
    this.seoService.updateCanonicalUrl('https://arshdeepgrover.dev/');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Explore the portfolio of Arshdeep Singh, a Lead Software Developer specializing in high-end digital experiences, Product Engineering, and UI/UX Design. Expert in Angular and Ruby on Rails.' },
      { name: 'keywords', content: 'Arshdeep Singh, Lead Software Developer, Product Engineer, UI/UX Specialist, Angular Expert, Ruby on Rails, Node.js, Web Design, Full Stack Developer, India' },
      { property: 'og:title', content: 'Arshdeep Singh | Lead Software Developer & UI/UX Specialist' },
      { property: 'og:description', content: 'Crafting high-end digital experiences and scalable software solutions.' },
      { property: 'og:url', content: 'https://arshdeepgrover.dev/' },
      { property: 'og:image', content: 'https://arshdeepgrover.dev/images/arshdeep-singh.png' }
    ]);
  }



  ngAfterViewInit() {
    // Initialize animations after view is ready
    this.initializeAnimations();
  }

  private initializeAnimations() {
    // Simple fade-in animation implementation
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

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }
}
