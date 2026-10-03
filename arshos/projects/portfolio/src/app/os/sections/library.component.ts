import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { blogs } from '@stores/blogs_store';
import { certificates } from '@stores/certificate_store';
import { IBlog } from '@models/blog.model';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';
import { PROFILE } from '../os.service';

/** Writing (an RSS reader) and certificates (a Preview contact sheet), side by side. */
@Component({
  selector: 'os-library',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="blogs" class="os-section os-container" aria-labelledby="blog-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">06 — feed.rss</span>
          <h2 id="blog-title" class="os-h2">Writing</h2>
          <p class="os-lede">Notes on web development, on Medium and Dev.to, and now at blogs.arshdeepgrover.dev.</p>
        </div>
        <a class="os-btn" [href]="PROFILE.links.blogs" target="_blank" rel="noopener">All posts ↗</a>
      </div>

      <os-window title="Reader — feed.rss" icon="¶" [flush]="true" osReveal="80">
        <span osBar class="os-chip">{{ posts.length }} unread</span>
        <div class="reader">
          <ul class="posts">
            @for (b of posts; track b.id) {
              <li>
                <a [href]="b.url" target="_blank" rel="noopener" class="post" [class.on]="hover() === b" (mouseenter)="hover.set(b)" (focus)="hover.set(b)">
                  <span class="unread" aria-hidden="true"></span>
                  <span class="meta">{{ b.date }} · {{ b.readTime }} min · {{ site(b.url) }}</span>
                  <span class="title">{{ b.title }}</span>
                  <span class="ex">{{ b.excerpt }}</span>
                </a>
              </li>
            }
          </ul>
          <div class="pane" aria-hidden="true">
            @if (hover(); as h) {
              <div class="pane-img"><img [src]="h.image" alt="" loading="lazy" /></div>
              <p class="pane-t">{{ h.title }}</p>
              <p class="pane-tags">
                @for (t of h.tags.slice(0, 4); track t) { <span class="os-chip">#{{ t.toLowerCase() }}</span> }
              </p>
            }
          </div>
        </div>
      </os-window>
    </section>

    <section id="certificates" class="os-section os-container" aria-labelledby="cert-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">07 — certs/</span>
          <h2 id="cert-title" class="os-h2">Certificates</h2>
        </div>
      </div>
      <os-window title="Preview — certs/" icon="✦" [flush]="true" osReveal="80">
        <ul class="certs">
          @for (c of certs; track c.id) {
            <li>
              <a [href]="c.credentialUrl" target="_blank" rel="noopener" class="cert">
                <span class="cimg"><img [src]="c.image" [alt]="c.title + ' certificate'" loading="lazy" /></span>
                <span class="ct">{{ c.title }}</span>
                <span class="cm">{{ c.issuer }} · {{ c.date }}</span>
              </a>
            </li>
          }
        </ul>
      </os-window>
    </section>
  `,
  styles: [
    `
      .reader { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr); }
      .posts { list-style: none; margin: 0; padding: 0; }
      .post { position: relative; display: grid; gap: 6px; padding: 18px 22px 18px 38px; border-bottom: 1px solid var(--line); transition: background .2s; }
      .post:hover, .post.on { background: var(--surface-2); }
      .unread { position: absolute; left: 18px; top: 24px; width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
      .meta { font: 500 12px/1 var(--font-mono); color: var(--dim); }
      .title { font: 600 17px/1.3 var(--font-display); letter-spacing: -.01em; }
      .post:hover .title { color: var(--accent); }
      .ex { color: var(--muted); font-size: 14px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      .pane { border-left: 1px solid var(--line); padding: 22px; background: var(--surface-2); position: sticky; top: 0; align-self: start; }
      .pane-img { aspect-ratio: 16 / 9; border-radius: 10px; overflow: hidden; background: var(--surface-3); border: 1px solid var(--line); }
      .pane-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .pane-t { margin: 16px 0 0; font: 700 22px/1.15 var(--font-display); letter-spacing: -.02em; }
      .pane-tags { display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0 0; }
      .certs { list-style: none; margin: 0; padding: 18px; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 18px; }
      .cert { display: grid; gap: 6px; padding: 8px; border-radius: 12px; transition: background .2s; }
      .cert:hover { background: var(--surface-2); }
      .cimg { aspect-ratio: 4 / 3; border-radius: 8px; overflow: hidden; background: #fff; border: 1px solid var(--line-2); box-shadow: 0 10px 24px -14px rgba(0,0,0,.5); }
      .cimg img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s var(--ease); }
      .cert:hover .cimg img { transform: scale(1.04); }
      .ct { margin-top: 6px; font-weight: 600; font-size: 14.5px; line-height: 1.3; }
      .cm { font: 500 12px/1 var(--font-mono); color: var(--dim); }
      @media (max-width: 860px) { .reader { grid-template-columns: 1fr; } .pane { display: none; } }
      @media (max-width: 520px) { .certs { grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 10px; } .ct { font-size: 13px; } }
    `,
  ],
})
export class LibraryComponent {
  readonly PROFILE = PROFILE;
  readonly posts = [...blogs].reverse();
  readonly certs = [...certificates].reverse();
  readonly hover = signal<IBlog | null>(this.posts[0] ?? null);

  site(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }
}
