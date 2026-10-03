import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { communityEntries, ICommunityEntry } from '@stores/community_store';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface IEvent {
  e: ICommunityEntry;
  mon: string;
  year: number;
  /** year * 12 + monthIndex, for sorting and month lookup. */
  key: number;
}

/** Talks, mentoring and judging: a Mon–Sun calendar header over the event list. */
@Component({
  selector: 'os-community',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="community" class="os-section os-container" aria-labelledby="com-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">05 — calendar</span>
          <h2 id="com-title" class="os-h2">In the community</h2>
          <p class="os-lede">Hackathons I've mentored and judged, and the talks and workshops I've given.</p>
        </div>
      </div>

      <os-window title="Calendar — community.ics" icon="◷" [flush]="true" osReveal="80">
        <div osBar class="seg" role="tablist" aria-label="Filter events">
          @for (f of filters; track f.k) {
            <button type="button" role="tab" [attr.aria-selected]="filter() === f.k" [class.on]="filter() === f.k" (click)="filter.set(f.k)">{{ f.label }}</button>
          }
        </div>

        <!-- week header: calendar look, today's weekday highlighted -->
        <div class="week" aria-hidden="true">
          @for (d of weekdays; track d; let i = $index) {
            <span class="wd" [class.today]="i === todayIdx">{{ d }}</span>
          }
        </div>

        <!-- list -->
        <ol class="events">
          @for (ev of visible(); track ev.e.id) {
            <li class="ev" [attr.id]="'ev-' + ev.e.id" [attr.data-type]="ev.e.type" [class.flash]="flash() === ev.e.id">
              <div class="date">
                <span class="mon">{{ ev.mon }}</span>
                <span class="yr">{{ ev.e.day ?? ev.year }}</span>
                @if (ev.e.day) { <span class="yy">{{ ev.year }}</span> }
              </div>
              <div class="info">
                <p class="row">
                  <span class="role" [attr.data-r]="role(ev)">{{ ev.e.role }}</span>
                  <span class="where">{{ ev.e.location }}</span>
                  @if (ev.e.highlight) { <span class="hi">★ {{ ev.e.highlight }}</span> }
                </p>
                <h3>{{ clean(ev.e.event) }}</h3>
                <p class="org">{{ ev.e.organizer }}</p>
                <p class="desc">{{ ev.e.description }}</p>
              </div>
            </li>
          }
        </ol>
      </os-window>
    </section>
  `,
  styles: [
    `
      button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; padding: 0; }
      .seg { display: flex; padding: 2px; border-radius: 8px; background: var(--surface-3); }
      .seg button { padding: 4px 10px; border-radius: 6px; font: 500 12px/1.2 var(--font-sans); color: var(--muted); }
      .seg button.on { background: var(--surface); color: var(--text); box-shadow: 0 1px 2px rgba(0,0,0,.2); }

      /* role colours */
      [data-r="mentor"] { --rc: var(--accent); }
      [data-r="judge"] { --rc: var(--info); }
      [data-r="speaker"] { --rc: var(--violet); }

      .week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); border-bottom: 1px solid var(--line); background: var(--surface-2); }
      .wd { padding: 12px 0; text-align: center; font: 600 11.5px/1 var(--font-sans); letter-spacing: .08em; text-transform: uppercase; color: var(--dim); border-right: 1px solid var(--line); }
      .wd:last-child { border-right: 0; }
      .wd:nth-child(n + 6) { color: color-mix(in srgb, var(--dim) 70%, transparent); }
      .wd.today { color: var(--red); }
      .wd.today::after { content: ''; display: block; width: 5px; height: 5px; border-radius: 50%; background: var(--red); margin: 6px auto 0; }
      .events { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .ev { display: grid; grid-template-columns: 64px 1fr; gap: 18px; padding: 22px clamp(16px, 3vw, 28px); border-bottom: 1px solid var(--line); transition: background .6s; scroll-margin-top: 90px; }
      .ev:nth-child(odd) { border-right: 1px solid var(--line); }
      .ev.flash { background: var(--accent-soft); }
      .date { height: 70px; border-radius: 12px; overflow: hidden; display: grid; grid-template-rows: 22px 1fr auto; text-align: center; background: var(--surface-2); border: 1px solid var(--line-2); }
      .mon { background: var(--red); color: #fff; font: 700 11px/22px var(--font-sans); text-transform: uppercase; letter-spacing: .06em; }
      .yr { display: grid; place-items: center; font: 700 19px/1 var(--font-display); }
      .yy { font: 500 10px/1 var(--font-mono); color: var(--dim); padding-bottom: 6px; }
      .row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 0; font: 500 12px/1 var(--font-mono); }
      .role { padding: 4px 8px; border-radius: 6px; background: color-mix(in srgb, var(--rc) 16%, transparent); color: var(--rc); }
      .where { color: var(--dim); }
      .hi { color: var(--warn); }
      h3 { margin: 10px 0 0; font: 600 18px/1.25 var(--font-display); letter-spacing: -.01em; }
      .org { margin: 4px 0 0; color: var(--text); opacity: .75; font-size: 14px; }
      .desc { margin: 8px 0 0; color: var(--muted); font-size: 14.5px; line-height: 1.6; }

      @media (max-width: 860px) { .events { grid-template-columns: 1fr; } .ev:nth-child(odd) { border-right: 0; } }
      @media (max-width: 640px) {
        .wd { font-size: 10.5px; letter-spacing: .04em; }
        .ev { grid-template-columns: 52px 1fr; gap: 14px; }
      }
    `,
  ],
})
export class CommunityComponent {
  readonly filters = [
    { k: 'all', label: 'All' },
    { k: 'speaking', label: 'Talks' },
    { k: 'volunteering', label: 'Mentor & judge' },
  ] as const;
  readonly filter = signal<'all' | 'speaking' | 'volunteering'>('all');
  readonly weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  readonly flash = signal<number | null>(null);

  private readonly events: IEvent[] = communityEntries
    .map((e) => {
      const [mon, y] = e.date.split(' ');
      const year = Number(y);
      return { e, mon, year, key: year * 12 + Math.max(0, MONTHS.indexOf(mon)) };
    })
    .sort((a, b) => b.key - a.key || (b.e.day ?? 0) - (a.e.day ?? 0));

  /** Monday-first index of today's weekday. */
  readonly todayIdx = (new Date().getDay() + 6) % 7;

  readonly visible = computed(() => this.events.filter((ev) => this.filter() === 'all' || ev.e.type === this.filter()));

  focus(ev: IEvent): void {
    if (this.filter() !== 'all' && ev.e.type !== this.filter()) this.filter.set('all');
    setTimeout(() => document.getElementById(`ev-${ev.e.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }));
    this.flash.set(ev.e.id);
    setTimeout(() => this.flash.set(null), 1600);
  }

  role(ev: IEvent): string {
    return ev.e.role.toLowerCase();
  }

  clean(s: string): string {
    return s.replace(/"/g, '');
  }
}
