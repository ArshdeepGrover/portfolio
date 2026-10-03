import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { certificates } from '@stores/certificate_store';
import { ICertificate } from '@models/certificate.model';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface ICert {
  c: ICertificate;
  /** Last date in the range, used for sorting ("Jun 2019 - Jan 2020" → Jan 2020). */
  sortKey: number;
  credentialId: string;
  host: string;
}

/**
 * Certificates as Keychain Access: issuer filters on the left, a sortable-looking
 * list in the middle, and a certificate viewer for the selected item.
 */
@Component({
  selector: 'os-certificates',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="certificates" class="os-section os-container" aria-labelledby="cert-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">07 — keychain</span>
          <h2 id="cert-title" class="os-h2">Certificates</h2>
          <p class="os-lede">Courses and assessments I've completed. Select one to inspect it, or open the credential to verify.</p>
        </div>
      </div>

      <os-window title="Keychain Access — certificates" icon="🔏" [flush]="true" osReveal="80">
        <span osBar class="os-chip">{{ items.length }} certificates</span>

        <div class="kc">
          <aside class="side">
            <p class="side-h">Issuers</p>
            <ul>
              @for (i of issuers; track i) {
                <li>
                  <button type="button" [class.on]="issuer() === i" (click)="pickIssuer(i)">
                    <span class="ico" aria-hidden="true">{{ i === 'All' ? '◆' : '◇' }}</span>{{ i }}<span class="n">{{ count(i) }}</span>
                  </button>
                </li>
              }
            </ul>
          </aside>

          <div class="list">
            <div class="thead" aria-hidden="true">
              <span>Name</span><span class="hide-sm">Issuer</span><span>Issued</span><span class="hide-sm">Status</span>
            </div>
            <ul role="listbox" aria-label="Certificates">
              @for (it of visible(); track it.c.id; let first = $first) {
                <li role="option" [attr.aria-selected]="selected() === it">
                  <button type="button" class="row" [class.sel]="selected() === it" (click)="selected.set(it)">
                    <span class="name">
                      <span class="seal" aria-hidden="true">
                        <svg viewBox="0 0 24 24"><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-.9 2.9-3-.2L12 20l-2.4-1.8-3 .2-.9-2.9L3.2 13.8l.9-2.9-.9-2.9 2.5-1.7.9-2.9 3 .2Z"/><path d="m8.5 11.5 2.3 2.3 4.7-4.7" class="tick"/></svg>
                      </span>
                      <span class="t">{{ it.c.title }}</span>
                      @if (it === newest) { <span class="new">New</span> }
                    </span>
                    <span class="dim hide-sm">{{ it.c.issuer }}</span>
                    <span class="dim mono">{{ it.c.date }}</span>
                    <span class="ok hide-sm">✓ Valid</span>
                  </button>
                </li>
              }
            </ul>
          </div>

          @if (selected(); as s) {
            <article class="viewer" aria-live="polite">
              <a class="thumb" [href]="s.c.credentialUrl" target="_blank" rel="noopener" [attr.aria-label]="'Open ' + s.c.title + ' credential'">
                <img [src]="s.c.image" [alt]="s.c.title + ' certificate'" loading="lazy" />
              </a>

              <header class="v-head">
                <span class="big-seal" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 2l2.4 1.8 3-.2.9 2.9 2.5 1.7-.9 2.9.9 2.9-2.5 1.7-.9 2.9-3-.2L12 20l-2.4-1.8-3 .2-.9-2.9L3.2 13.8l.9-2.9-.9-2.9 2.5-1.7.9-2.9 3 .2Z"/><path d="m8.5 11.5 2.3 2.3 4.7-4.7" class="tick"/></svg>
                </span>
                <div>
                  <h3>{{ s.c.title }}</h3>
                  <p class="by">Issued by {{ s.c.issuer }}</p>
                  <p class="valid">✓ This certificate is valid</p>
                </div>
              </header>

              <dl class="fields">
                <div><dt>Subject</dt><dd>Arshdeep Singh</dd></div>
                <div><dt>Issuer</dt><dd>{{ s.c.issuer }}</dd></div>
                <div><dt>Issued</dt><dd>{{ s.c.date }}</dd></div>
                <div><dt>Credential ID</dt><dd class="mono trunc" [attr.title]="s.credentialId">{{ s.credentialId }}</dd></div>
                <div><dt>Verify at</dt><dd class="mono trunc">{{ s.host }}</dd></div>
              </dl>

              <p class="desc">{{ s.c.description }}</p>

              <a class="os-btn primary view" [href]="s.c.credentialUrl" target="_blank" rel="noopener">View credential ↗</a>
            </article>
          }
        </div>
      </os-window>
    </section>
  `,
  styles: [
    `
      button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; text-align: left; }
      .kc { display: grid; grid-template-columns: 180px minmax(0, 1fr) minmax(300px, 360px); min-height: 460px; }

      .side { min-width: 0; padding: 16px 10px; border-right: 1px solid var(--line); background: var(--surface-2); }
      .side-h { margin: 6px 10px 8px; font: 600 11px/1 var(--font-sans); color: var(--dim); }
      .side ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 1px; }
      .side button { width: 100%; display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 7px; font-size: 14px; color: var(--muted); }
      .side button:hover { color: var(--text); background: var(--surface-3); }
      .side button.on { background: var(--accent-soft); color: var(--text); }
      .ico { width: 14px; color: var(--dim); font-size: 11px; }
      .side button.on .ico { color: var(--accent); }
      .n { margin-left: auto; font: 500 11.5px/1 var(--font-mono); color: var(--dim); }

      .list { min-width: 0; border-right: 1px solid var(--line); }
      .thead, .row { display: grid; grid-template-columns: minmax(0, 1fr) 112px 158px 70px; gap: 12px; align-items: center; padding: 0 16px; }
      .thead { height: 36px; border-bottom: 1px solid var(--line); font: 600 11.5px/1 var(--font-sans); color: var(--dim); }
      .list ul { list-style: none; margin: 0; padding: 0; }
      .row { width: 100%; min-height: 48px; border-bottom: 1px solid var(--line); font-size: 14px; transition: background .15s; }
      .list li:nth-child(even) .row { background: color-mix(in srgb, var(--surface-2) 55%, transparent); }
      .row:hover { background: var(--surface-2) !important; }
      .row.sel { background: var(--accent-soft) !important; }
      .row:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
      .name { display: flex; align-items: center; gap: 10px; min-width: 0; }
      .t { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text); }
      .seal svg, .big-seal svg { display: block; fill: color-mix(in srgb, var(--warn) 22%, transparent); stroke: var(--warn); stroke-width: 1.4; stroke-linejoin: round; }
      .seal svg { width: 20px; height: 20px; }
      .tick { fill: none !important; stroke-width: 2 !important; stroke-linecap: round; }
      .new { font: 600 10px/1 var(--font-mono); text-transform: uppercase; letter-spacing: .06em; color: var(--accent); border: 1px solid color-mix(in srgb, var(--accent) 50%, transparent); padding: 3px 6px; border-radius: 5px; flex: none; }
      .dim { color: var(--muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .mono { font-family: var(--font-mono); font-size: 12.5px; }
      .ok { color: var(--ok); font: 500 12.5px/1 var(--font-mono); }

      .viewer { padding: 22px; background: var(--surface); display: flex; flex-direction: column; gap: 16px; min-width: 0; }
      .v-head { display: flex; gap: 14px; align-items: flex-start; }
      .v-head > div { min-width: 0; }
      .big-seal svg { width: 52px; height: 52px; }
      h3 { margin: 0; font: 700 19px/1.2 var(--font-display); letter-spacing: -.015em; }
      .by { margin: 4px 0 0; font-size: 13.5px; color: var(--muted); }
      .valid { margin: 8px 0 0; font: 500 12.5px/1 var(--font-mono); color: var(--ok); }
      .fields { margin: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
      .fields div { display: grid; grid-template-columns: 104px minmax(0, 1fr); gap: 10px; padding: 9px 12px; border-top: 1px solid var(--line); font-size: 13.5px; }
      .fields div:first-child { border-top: 0; }
      .fields div:nth-child(odd) { background: var(--surface-2); }
      dt { color: var(--dim); font: 500 12px/1.5 var(--font-mono); }
      dd { margin: 0; color: var(--text); min-width: 0; }
      .trunc { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .desc { margin: 0; color: var(--muted); font-size: 14px; line-height: 1.55; }
      .thumb { display: block; border-radius: 8px; overflow: hidden; border: 1px solid var(--line-2); background: #fff; aspect-ratio: 4 / 3; box-shadow: 0 12px 30px -18px rgba(0,0,0,.6); }
      .thumb img { width: 100%; height: 100%; object-fit: cover; object-position: top; display: block; transition: transform .4s var(--ease); }
      .thumb:hover img { transform: scale(1.03); }
      .view { align-self: flex-start; }

      @media (max-width: 1100px) {
        .kc { grid-template-columns: 160px minmax(0, 1fr); }
        .viewer { grid-column: 1 / -1; border-top: 1px solid var(--line); display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: start; }
        .v-head, .desc, .view, .fields { grid-column: 2; }
        .thumb { grid-column: 1; grid-row: 1 / span 4; }
        .list { border-right: 0; }
      }
      @media (max-width: 720px) {
        .kc { grid-template-columns: minmax(0, 1fr); }
        .side { border-right: 0; border-bottom: 1px solid var(--line); padding: 10px; }
        .side-h { display: none; }
        .side ul { display: flex; overflow-x: auto; gap: 6px; scrollbar-width: none; }
        .side button { white-space: nowrap; border: 1px solid var(--line); }
        .thead, .row { grid-template-columns: minmax(0, 1fr) 96px; }
        .hide-sm { display: none; }
        .viewer { display: flex; }
      }
    `,
  ],
})
export class CertificatesComponent {
  readonly items: ICert[] = certificates
    .map((c) => {
      const last = c.date.split('-').pop()!.trim();
      const [m, y] = last.split(' ');
      let host = '';
      let credentialId = '';
      try {
        const u = new URL(c.credentialUrl);
        host = u.hostname.replace(/^www\./, '');
        credentialId = u.pathname.split('/').filter(Boolean).pop()!.replace(/\.pdf$/, '').replace(/^certificate/, '');
      } catch {
        /* leave blank */
      }
      return { c, sortKey: Number(y) * 12 + Math.max(0, MONTHS.indexOf(m)), credentialId, host };
    })
    .sort((a, b) => b.sortKey - a.sortKey);

  readonly newest = this.items[0];
  readonly issuers = ['All', ...new Set(this.items.map((i) => i.c.issuer))];
  readonly issuer = signal('All');
  readonly selected = signal<ICert | null>(this.items[0] ?? null);

  readonly visible = computed(() => this.items.filter((i) => this.issuer() === 'All' || i.c.issuer === this.issuer()));

  count(i: string): number {
    return i === 'All' ? this.items.length : this.items.filter((x) => x.c.issuer === i).length;
  }

  pickIssuer(i: string): void {
    this.issuer.set(i);
    const v = this.visible();
    if (!v.includes(this.selected()!)) this.selected.set(v[0] ?? null);
  }
}
