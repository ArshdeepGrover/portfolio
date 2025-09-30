import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Typed from 'typed.js';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('typedElement', { static: true }) typedElement!: ElementRef;
  @ViewChild('typedCodeElement', { static: true }) typedCodeElement!: ElementRef;
  
  private typed!: Typed;
  private typedCode!: Typed;

  ngOnInit() {
    this.initTypedAnimations();
  }

  ngOnDestroy() {
    if (this.typed) this.typed.destroy();
    if (this.typedCode) this.typedCode.destroy();
  }

  private initTypedAnimations() {
    // Role typing animation
    this.typed = new Typed(this.typedElement.nativeElement, {
      strings: [
        'Full Stack Developer',
        'Angular Developer', 
        'Ruby on Rails Developer',
        'Open Source Contributor'
      ],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: false
    });

    // Code typing animation
    this.typedCode = new Typed(this.typedCodeElement.nativeElement, {
      strings: [
        'const developer = new FullStackDev();',
        'developer.skills = ["Angular", "Ruby"];',
        'developer.build("amazing-projects");',
        'console.log("Ready to code!");'
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 3000,
      loop: true,
      showCursor: false
    });
  }
}