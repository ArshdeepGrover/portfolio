import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="site-footer">
      <div class="footer-inner">
        <p>© {{ year }} <a href="https://arshdeepgrover.dev" target="_blank">Arshdeep Singh</a> · Built with Angular + Sanity.io</p>
        <div class="footer-links">
          <a href="https://arshdeepgrover.dev" target="_blank">Portfolio</a>
          <a href="https://links.arshdeepgrover.dev" target="_blank">Links</a>
          <a href="https://github.com/ArshdeepGrover" target="_blank">GitHub</a>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding: 2rem 1.5rem;
      margin-top: 4rem;
    }
    .footer-inner {
      max-width: 900px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    p, a { font-size: 0.85rem; color: rgba(255,255,255,0.35); text-decoration: none; }
    a:hover { color: #ff7955; }
    p a { color: rgba(255,255,255,0.5); }
    .footer-links { display: flex; gap: 1.25rem; }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
