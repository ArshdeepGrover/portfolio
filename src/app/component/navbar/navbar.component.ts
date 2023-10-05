import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  highlight!: any;

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
}
