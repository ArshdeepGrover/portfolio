import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { CertificatesComponent } from './components/certificates/certificates.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent,
    CertificatesComponent,
    BlogsComponent,
    ChatbotComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit() {
    // Component initialization logic here
  }

  ngAfterViewInit() {
    // Initialize animations after view is ready
    this.initializeAnimations();
    // Scroll to fragment if present on load
    setTimeout(() => {
      this.scrollToFragment();
    }, 0);
    // Listen for fragment changes on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToFragment();
      }
    });
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

  private scrollToFragment() {
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        this.viewportScroller.scrollToAnchor(fragment);
      }, 0);
    }
  }
}
