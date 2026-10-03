import { ChangeDetectionStrategy, Component, HostListener, Input, signal } from '@angular/core';

/**
 * App-window chrome used by every section: title bar with working traffic
 * lights (red/yellow fold the window, green opens it full screen), a centred
 * title, an optional right-hand slot, and the body.
 */
@Component({
  selector: 'os-window',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.folded]': 'folded()', '[class.max]': 'max()' },
  template: `
    @if (max()) {
      <div class="scrim" (click)="max.set(false)"></div>
    }
    <div class="win" [class.flush]="flush">
      <header class="bar">
        <div class="lights">
          <button type="button" class="l r" (click)="toggleFold()" [attr.aria-label]="folded() ? 'Expand ' + title : 'Fold ' + title"></button>
          <button type="button" class="l y" (click)="toggleFold()" aria-hidden="true" tabindex="-1"></button>
          <button type="button" class="l g" (click)="toggleMax()" [attr.aria-label]="max() ? 'Exit full screen' : 'Full screen ' + title"></button>
        </div>
        <div class="title"><span class="icon">{{ icon }}</span>{{ title }}</div>
        <div class="extra"><ng-content select="[osBar]"></ng-content></div>
      </header>
      <div class="body" [class.pad]="!flush">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      :host { display: block; position: relative; }
      .win {
        background: var(--surface); border: 1px solid var(--line-2); border-radius: var(--radius);
        box-shadow: var(--shadow); overflow: hidden; transition: box-shadow .3s;
      }
      .bar {
        height: 40px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
        padding: 0 12px; border-bottom: 1px solid var(--line); background: var(--surface-2);
        user-select: none;
      }
      .lights { display: flex; gap: 7px; }
      .l { width: 12px; height: 12px; border-radius: 50%; border: 0; padding: 0; cursor: pointer; position: relative; }
      .l::after { content: ''; position: absolute; inset: -6px; }
      .r { background: #ff5f57; } .y { background: #febc2e; } .g { background: #28c840; }
      .lights:not(:hover) .l { filter: saturate(.85); }
      .title {
        font: 500 12.5px/1 var(--font-mono); color: var(--muted); display: flex; gap: 8px; align-items: center;
        white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 52vw;
      }
      .icon { color: var(--accent); }
      .extra { justify-self: end; display: flex; gap: 8px; align-items: center; min-width: 0; }
      .body.pad { padding: clamp(18px, 3vw, 32px); }
      :host(.folded) .body { display: none; }
      :host(.folded) .bar { border-bottom: 0; }
      .scrim { position: fixed; inset: 0; background: rgba(0,0,0,.55); backdrop-filter: blur(6px); z-index: 80; }
      :host(.max) .win {
        position: fixed; z-index: 81; inset: calc(var(--bar-h) + 12px) 12px 12px; display: flex; flex-direction: column;
      }
      :host(.max) .body { overflow: auto; flex: 1; }
      @media (max-width: 640px) { .title { max-width: 46vw; } .extra { display: none; } .bar { grid-template-columns: auto 1fr; gap: 12px; } .title { justify-self: center; transform: translateX(-26px); } }
    `,
  ],
})
export class WindowComponent {
  @Input({ required: true }) title = '';
  @Input() icon = '●';
  /** Remove body padding for edge-to-edge content (tables, editors). */
  @Input() flush = false;

  folded = signal(false);
  max = signal(false);

  toggleFold(): void {
    this.max.set(false);
    this.folded.update((v) => !v);
  }

  toggleMax(): void {
    this.folded.set(false);
    this.max.update((v) => !v);
    document.documentElement.style.overflow = this.max() ? 'hidden' : '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.max()) this.toggleMax();
  }
}
