import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OsService, PROFILE } from '../os.service';

/**
 * Bottom dock. One tile per section plus the terminal, résumé and GitHub.
 * Tiles magnify on hover (neighbours grow a little too). On phones it
 * becomes a scrollable tab strip and is the main navigation.
 */
@Component({
  selector: 'os-dock',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="dock" aria-label="Sections">
      @for (s of os.sections; track s.id) {
        <a class="tile" [href]="'#' + s.id" [class.on]="os.activeSection() === s.id" (click)="go($event, s.id)" [attr.aria-label]="s.label">
          <span class="glyph" [attr.data-g]="s.id">{{ s.glyph }}</span>
          <span class="tip">{{ s.label }}</span>
        </a>
      }
      <span class="sep" aria-hidden="true"></span>
      <button type="button" class="tile" (click)="os.toggleTerminal()" aria-label="Terminal">
        <span class="glyph term">&gt;_</span><span class="tip">Terminal</span>
      </button>
      <a class="tile" [href]="PROFILE.resume" target="_blank" rel="noopener" aria-label="Résumé (PDF)">
        <span class="glyph pdf">CV</span><span class="tip">Résumé.pdf</span>
      </a>
      <a class="tile" [href]="PROFILE.links.github" target="_blank" rel="noopener" aria-label="GitHub">
        <span class="glyph gh">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .5Z"/></svg>
        </span>
        <span class="tip">GitHub</span>
      </a>
    </nav>
  `,
  styles: [
    `
      :host { position: fixed; left: 50%; bottom: 12px; transform: translateX(-50%); z-index: 55; max-width: calc(100vw - 16px); }
      .dock {
        display: flex; align-items: flex-end; gap: 6px; padding: 7px; border-radius: 20px;
        background: color-mix(in srgb, var(--surface) 70%, transparent);
        backdrop-filter: saturate(1.6) blur(20px); -webkit-backdrop-filter: saturate(1.6) blur(20px);
        border: 1px solid var(--line-2); box-shadow: var(--shadow);
      }
      .tile {
        position: relative; width: 44px; height: 44px; flex: none; display: grid; place-items: center;
        border: 0; padding: 0; background: none; cursor: pointer; color: var(--text);
        transition: width .25s var(--ease), height .25s var(--ease), margin .25s var(--ease);
      }
      .glyph {
        width: 100%; height: 100%; display: grid; place-items: center; border-radius: 12px;
        background: linear-gradient(160deg, var(--surface-3), var(--surface-2)); border: 1px solid var(--line-2);
        font: 600 17px/1 var(--font-mono); color: var(--muted); transition: color .2s, background .2s;
      }
      .glyph[data-g="hero"] { background: var(--accent); color: var(--accent-ink); border-color: transparent; }
      .glyph.term { font-size: 13px; color: var(--ok); background: #0d0d0f; }
      .glyph.pdf { font-size: 12px; color: var(--red); }
      .glyph.gh svg { width: 20px; height: 20px; }
      .tile:hover .glyph, .tile.on .glyph { color: var(--text); }
      .tile.on::after {
        content: ''; position: absolute; bottom: -5px; left: 50%; width: 4px; height: 4px; margin-left: -2px;
        border-radius: 50%; background: var(--accent);
      }
      .tip {
        position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translate(-50%, 4px);
        font: 500 12px/1 var(--font-sans); white-space: nowrap; color: var(--text);
        background: var(--surface); border: 1px solid var(--line-2); padding: 6px 9px; border-radius: 7px;
        opacity: 0; pointer-events: none; transition: opacity .15s, transform .15s;
      }
      .sep { width: 1px; align-self: stretch; margin: 4px 3px; background: var(--line-2); }
      @media (hover: hover) and (min-width: 721px) {
        .tile:hover { width: 62px; height: 62px; }
        .tile:hover .tip { opacity: 1; transform: translate(-50%, 0); }
        .tile:has(+ .tile:hover), .tile:hover + .tile { width: 52px; height: 52px; }
      }
      @media (max-width: 720px) {
        :host { left: 8px; right: 8px; transform: none; bottom: 8px; }
        .dock { overflow-x: auto; scrollbar-width: none; gap: 4px; padding: 6px; align-items: center; }
        .dock::-webkit-scrollbar { display: none; }
        .tile { width: 40px; height: 40px; }
        .glyph { font-size: 15px; border-radius: 11px; }
        .tile.on::after { bottom: -4px; }
      }
    `,
  ],
})
export class DockComponent {
  readonly os = inject(OsService);
  readonly PROFILE = PROFILE;

  go(e: Event, id: string): void {
    e.preventDefault();
    this.os.scrollTo(id);
  }
}
