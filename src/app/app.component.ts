import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.checkFragment();
  }

  checkFragment() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollAuto(fragment);
      }
    });
  }

  scrollAuto(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'start',
      });
  }
}
