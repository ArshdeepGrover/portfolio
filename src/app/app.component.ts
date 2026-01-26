import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller,
  ) {}

  ngOnInit() {
    // Component initialization logic here
  }

  ngAfterViewInit() {
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
