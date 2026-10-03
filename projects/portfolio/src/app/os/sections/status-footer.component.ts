import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../os.service';

@Component({
  selector: 'os-status-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="os-container foot">
      <div class="big" aria-hidden="true">arsh<span>OS</span></div>
      <div class="bar">
        <span>© {{ year }} {{ PROFILE.name }}</span>
        <span class="sep">·</span>
        <span>Built with Angular, by hand</span>
        <span class="sp"></span>
        @for (l of links; track l[0]) {
          <a [href]="l[1]" target="_blank" rel="noopener">{{ l[0] }}</a>
        }
      </div>
    </footer>
  `,
  styles: [
    `
      .foot { padding: clamp(64px, 10vw, 120px) 0 24px; }
      .big {
        font: 800 clamp(72px, 19vw, 260px)/.8 var(--font-display); letter-spacing: -.06em; text-align: center; user-select: none;
        background: linear-gradient(to bottom, var(--surface-3), transparent 92%); -webkit-background-clip: text; background-clip: text; color: transparent;
      }
      .big span { background: linear-gradient(to bottom, color-mix(in srgb, var(--accent) 55%, transparent), transparent 92%); -webkit-background-clip: text; background-clip: text; }
      .bar { display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; padding-top: 18px; margin-top: 8px; border-top: 1px solid var(--line); font: 500 12.5px/1 var(--font-mono); color: var(--dim); }
      .sp { flex: 1; }
      a:hover { color: var(--accent); }
      @media (max-width: 640px) { .sep, .sp { display: none; } .bar { justify-content: center; } }
    `,
  ],
})
export class StatusFooterComponent {
  readonly PROFILE = PROFILE;
  readonly year = new Date().getFullYear();
  readonly links: [string, string][] = [
    ['GitHub', PROFILE.links.github],
    ['LinkedIn', PROFILE.links.linkedin],
    ['Medium', PROFILE.links.medium],
    ['X', PROFILE.links.x],
    ['Dev.to', PROFILE.links.devto],
  ];
}
