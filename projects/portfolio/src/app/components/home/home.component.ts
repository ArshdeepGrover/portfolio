import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificatesComponent } from '../certificates/certificates.component';
import { BlogsComponent } from '../blogs/blogs.component';
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
    CameraDrawingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private seoService: SeoService) {}

  ngOnInit() {
    this.seoService.updateTitle('Arshdeep Singh | Lead Software Developer & UI/UX Specialist');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Portfolio of Arshdeep Singh, a Lead Software Developer and UI/UX Specialist. Explore projects in Angular, TypeScript, Node.js, and Ruby on Rails.' },
      { name: 'keywords', content: 'Arshdeep Singh, Software Developer, UI/UX, Portfolio, Angular, TypeScript, Node.js, Ruby on Rails' },
      { property: 'og:title', content: 'Arshdeep Singh | Lead Software Developer & UI/UX Specialist' },
      { property: 'og:description', content: 'Crafting high-end digital experiences and scalable software solutions.' },
      { property: 'og:url', content: 'https://arshdeepgrover.dev/' }
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
