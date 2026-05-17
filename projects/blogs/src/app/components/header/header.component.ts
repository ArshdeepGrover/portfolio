import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  scrolled = false;
  menuOpen = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
