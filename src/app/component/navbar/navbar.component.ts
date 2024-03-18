import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  highlight!: any;
  isScrolled = false;

  menu = [
    {
      name: 'Home',
      fragment: 'home',
    },
    {
      name: 'Skills',
      fragment: 'skills',
    },
    {
      name: 'Certification',
      fragment: 'certification',
    },
    {
      name: 'Experience',
      fragment: 'experience',
    },
    {
      name: 'Service',
      fragment: 'service',
    },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.checkFragment();
  }

  checkFragment() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.highlight = fragment;
      } else {
        this.highlight = 'home';
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
}
