import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { CertificatesComponent } from '../certificates/certificates.component';
import { BlogsComponent } from '../blogs/blogs.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
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
