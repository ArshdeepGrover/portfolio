import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  highlight!: any;
  isScrolled = false;
  isDarkMode = false;

  menu = [
    {
      name: 'Home',
      fragment: 'home',
    },
    {
      name: 'Skills',
      fragment: 'skills',
    },
    // {
    //   name: 'Works',
    //   fragment: 'projects',
    // },
    {
      name: 'Experience',
      fragment: 'experience',
    },
    // { name: 'Achievements', fragment: 'achievements' },
    {
      name: 'Service',
      fragment: 'service',
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public darkModeService: DarkModeService
  ) {}
  ngOnInit(): void {
    this.checkFragment();
    this.checkTheme();
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

  checkTheme() {
    this.isDarkMode = this.darkModeService.isDarkMode();
  }

  toggleTheme(): void {
    const isCurrentlyDark = this.darkModeService.isDarkMode();
    this.darkModeService.toggleDarkMode(!isCurrentlyDark);
    this.checkTheme();
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
