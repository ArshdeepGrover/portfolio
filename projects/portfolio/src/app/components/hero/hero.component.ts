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
        'Hackathon Mentor & Judge',
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
        '<span class="code-keyword">const</span> <span class="code-variable">developer</span> = <span class="code-keyword">new</span> <span class="code-class">FullStackDev</span>();',
        '<span class="code-variable">developer</span>.<span class="code-property">skills</span> = [<span class="code-string">"Angular"</span>, <span class="code-string">"Ruby"</span>];',
        '<span class="code-variable">developer</span>.<span class="code-method">build</span>(<span class="code-string">"amazing-projects"</span>);',
        '<span class="code-variable">developer</span>.<span class="code-property">role</span> = <span class="code-string">"Hackathon Mentor "</span>;',
        '<span class="code-console">console</span>.<span class="code-method">log</span>(<span class="code-string">"Ready to code!"</span>);'
      ],
      typeSpeed: 100,
      backSpeed: 10,
      backDelay: 3000,
      loop: true,
      showCursor: false
    });
  }
}