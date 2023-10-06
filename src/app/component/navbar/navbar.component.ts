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
      routerLink: 'home',
    },
    {
      name: 'Skills',
      routerLink: 'skills',
    },
    {
      name: 'Experience',
      routerLink: 'experience',
    },
    // {
    //   name: 'Home',
    //   routerLink: 'home',
    // },
    // {
    //   name: 'Home',
    //   routerLink: 'home',
    // },
  ];

  constructor(private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.checkFragment();
  }

  checkFragment() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      this.highlight = fragment;
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
