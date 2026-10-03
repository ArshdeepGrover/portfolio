import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';
import { OsService, PROFILE } from '../os.service';

/** Contact as a Mail compose window. Sends through Web3Forms, same as before. */
@Component({
  selector: 'os-contact',
  standalone: true,
  imports: [FormsModule, WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="os-section os-container" aria-labelledby="contact-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">08 | mail</span>
          <h2 id="contact-title" class="os-h2">Say hello<span class="dot">.</span></h2>
          <p class="os-lede">Workshops, mentoring, a hackathon that needs a judge, or a product that needs building. I reply within a couple of days.</p>
        </div>
      </div>

      <div class="layout">
        <os-window title="New Message" icon="✉" [flush]="true" osReveal="80">
          <form class="mail" (ngSubmit)="send()" #f="ngForm">
            <div class="field static"><span>To:</span><b class="to">Arshdeep Singh</b><span class="addr">&lt;{{ PROFILE.email }}&gt;</span></div>
            <label class="field"><span>From:</span><input name="name" [(ngModel)]="name" required placeholder="Your name" autocomplete="name" /></label>
            <label class="field"><span>Reply-to:</span><input name="email" type="email" [(ngModel)]="email" required email placeholder="you&#64;example.com" autocomplete="email" /></label>
            <label class="field"><span>Subject:</span><input name="subject" [(ngModel)]="subject" placeholder="Workshop at our college" /></label>
            <textarea name="message" [(ngModel)]="message" required rows="7" placeholder="Hi Arshdeep, …" aria-label="Message"></textarea>
            <div class="actions">
              <button type="submit" class="os-btn primary" [disabled]="sending() || f.invalid">
                @if (sending()) { Sending… } @else {
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg> Send
                }
              </button>
              @if (result(); as r) {
                <p class="result" [class.ok]="r.ok" role="status">{{ r.text }}</p>
              } @else {
                <p class="hint">Name, email and message are required.</p>
              }
            </div>
          </form>
        </os-window>

        <aside class="side" osReveal="160">
          <button type="button" class="card big" (click)="os.copyEmail()">
            <span class="k">email · click to copy</span>
            <span class="v">{{ PROFILE.email }}</span>
          </button>
          @for (l of links; track l.label) {
            <a class="card" [href]="l.url" target="_blank" rel="noopener">
              <span class="k">{{ l.k }}</span><span class="v">{{ l.label }} <i>↗</i></span>
            </a>
          }
        </aside>
      </div>
    </section>
  `,
  styles: [
    `
      .dot { color: var(--accent); }
      .layout { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); gap: 18px; align-items: start; }
      .mail { display: flex; flex-direction: column; }
      .field { display: flex; align-items: center; gap: 10px; padding: 0 20px; height: 48px; border-bottom: 1px solid var(--line); }
      .field span { font-size: 14px; color: var(--dim); width: 74px; flex: none; }
      .field input { flex: 1; min-width: 0; height: 100%; border: 0; outline: 0; background: none; color: var(--text); font: 15px var(--font-sans); }
      .field:focus-within { background: var(--surface-2); }
      .to { font-weight: 600; font-size: 14px; background: var(--accent-soft); color: var(--text); padding: 3px 8px; border-radius: 6px; }
      .addr { width: auto !important; font: 13px var(--font-mono) !important; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      textarea { border: 0; outline: 0; resize: vertical; min-height: 180px; padding: 18px 20px; background: none; color: var(--text); font: 15px/1.65 var(--font-sans); }
      ::placeholder { color: var(--dim); }
      .actions { display: flex; align-items: center; gap: 16px; padding: 14px 20px; border-top: 1px solid var(--line); background: var(--surface-2); flex-wrap: wrap; }
      .actions svg { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linejoin: round; }
      button[disabled] { opacity: .5; cursor: not-allowed; transform: none; }
      .hint, .result { margin: 0; font: 500 12.5px/1.4 var(--font-mono); color: var(--dim); }
      .result { color: var(--red); } .result.ok { color: var(--ok); }
      .side { display: grid; gap: 10px; }
      .card {
        all: unset; cursor: pointer; display: grid; gap: 6px; padding: 16px 18px; border-radius: 12px;
        background: var(--surface); border: 1px solid var(--line-2); transition: border-color .2s, transform .25s var(--ease);
      }
      .card:hover { border-color: var(--accent); transform: translateX(3px); }
      .card:focus-visible { outline: 2px solid var(--accent); }
      .card .k { font: 500 11.5px/1 var(--font-mono); color: var(--dim); }
      .card .v { font: 600 16px/1.3 var(--font-display); letter-spacing: -.01em; word-break: break-all; }
      .card .v i { font-style: normal; color: var(--accent); }
      .card.big { background: var(--accent); border-color: transparent; }
      .card.big .k { color: color-mix(in srgb, var(--accent-ink) 70%, transparent); }
      .card.big .v { color: var(--accent-ink); font-size: 18px; }
      @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
      @media (max-width: 520px) { .field span { width: 64px; } .addr { display: none; } }
    `,
  ],
})
export class ContactComponent {
  readonly os = inject(OsService);
  readonly PROFILE = PROFILE;

  name = '';
  email = '';
  subject = '';
  message = '';
  readonly sending = signal(false);
  readonly result = signal<{ ok: boolean; text: string } | null>(null);

  readonly links = [
    { k: 'linkedin', label: 'in/ArshdeepGrover', url: PROFILE.links.linkedin },
    { k: 'github', label: 'ArshdeepGrover', url: PROFILE.links.github },
    { k: 'topmate', label: 'Book a 1:1 session', url: PROFILE.links.topmate },
    { k: 'studio', label: 'Freelance & client work', url: PROFILE.links.studio },
  ];

  async send(): Promise<void> {
    this.sending.set(true);
    this.result.set(null);
    const data = new FormData();
    data.append('access_key', '38c04ba8-73bf-48cb-a3a6-abf1a8a1acfd');
    data.append('name', this.name);
    data.append('email', this.email);
    data.append('subject', this.subject || `Portfolio message from ${this.name}`);
    data.append('message', this.message);
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        this.result.set({ ok: true, text: 'Sent. Thanks, I’ll get back to you soon.' });
        this.name = this.email = this.subject = this.message = '';
      } else {
        this.result.set({ ok: false, text: 'That didn’t go through. Try email instead?' });
      }
    } catch {
      this.result.set({ ok: false, text: 'Network error. Try email instead?' });
    } finally {
      this.sending.set(false);
      setTimeout(() => this.result.set(null), 7000);
    }
  }
}
