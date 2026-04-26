import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Typed from 'typed.js';

import { HERO_STATS } from '@stores/stats_store';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, OnDestroy {
  readonly stats = HERO_STATS;

  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;

  private typed!: Typed;

  ngOnInit() {
    this.typed = new Typed(this.typedElement.nativeElement, {
      strings: [
        'Web Design',
        'Product Design',
        'UI/UX Design',
        'Brand Identity',
        'Digital Experiences',
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: false,
    });
  }

  ngOnDestroy() {
    if (this.typed) this.typed.destroy();
  }
}
