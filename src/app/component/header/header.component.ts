import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Typed from 'typed.js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('typedElement') typedElement!: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const options = {
      strings: ['a Developer', 'a Web Designer'],
      typeSpeed: 80,
      backSpeed: 25,
      loop: true,
      smartBackspace: true,
      fadeOut: false,
      fadeOutClass: 'typed-fade-out',
      fadeOutDelay: 500,
      showCursor: false,
    };

    new Typed(this.typedElement.nativeElement, options);
  }
}
