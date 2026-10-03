import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { communityEntries, ICommunityEntry } from '@stores/community_store';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

interface IEvent {
  e: ICommunityEntry;
  mon: string;
  year: number;
  key: number; // year*12+month, for sorting and the activity strip
}

/** Talks, mentoring and judging as a calendar: an activity strip on top, events below. */
@Component({
  selector: 'os-community',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="community" class="os-section os-container" aria-labelledby="com-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">05 | calendar</span>
          <h2 id="com-title" class="os-h2">In the community</h2>
          <p class="os-lede">Hackathons I've mentored and judged, and the talks and workshops I've given.</p>
        </div>
      </div>

      <os-window title="Calendar | community.ics" icon="◷" [flush]="true" osReveal="80">
        <div osBar class="seg" role="tablist" aria-label="Filter events">
          @for (f of filters; track f.k) {
            <button type="button" role="tab" [attr.aria-selected]="filter() === f.k" [class.on]="filter() === f.k" (click)="filter.set(f.k)">{{ f.label }}</button>
          }
        </div>

        <div class="strip" aria-label="Activity by month">
          @for (m of months; track m.key) {
            <div class="m" [class.y]="m.mon === 'Jan'">
              <span class="cell" [class.on]="m.count" [class.two]="m.count > 1" [attr.title]="m.mon + ' ' + m.year + (m.count ? ': ' + m.count + ' event(s)' : '')"></span>
              <span class="ml">{{ m.mon === 'Jan' || $first ? m.mon + ' ’' + (m.year % 100) : m.mon[0] }}</span>
            </div>
          }
        </div>

        <ol class="events">
          @for (ev of visible(); track ev.e.id) {
            <li class="ev" [attr.data-type]="ev.e.type">
              <div class="date"><span class="mon">{{ ev.mon }}</span><span class="yr">{{ ev.year }}</span></div>
              <div class="info">
                <p class="row">
                  <span class="role" [attr.data-r]="ev.e.role.toLowerCase()">{{ ev.e.role }}</span>
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
      .seg { display: flex; padding: 2px; border-radius: 8px; background: var(--surface-3); }
      .seg button { all: unset; cursor: pointer; padding: 4px 10px; border-radius: 6px; font: 500 12px/1.2 var(--font-sans); color: var(--muted); }
      .seg button.on { background: var(--surface); color: var(--text); box-shadow: 0 1px 2px rgba(0,0,0,.2); }
      .strip { display: flex; gap: 4px; padding: 18px clamp(16px, 3vw, 28px) 14px; border-bottom: 1px solid var(--line); overflow-x: auto; scrollbar-width: thin; }
      .m { display: grid; justify-items: center; gap: 6px; flex: 1; min-width: 22px; }
      .m.y { border-left: 1px dashed var(--line-2); padding-left: 4px; }
      .cell { width: 100%; max-width: 40px; height: 22px; border-radius: 5px; background: var(--surface-2); border: 1px solid var(--line); }
      .cell.on { background: color-mix(in srgb, var(--accent) 55%, var(--surface)); border-color: transparent; }
      .cell.two { background: var(--accent); }
      .ml { font: 500 10px/1 var(--font-mono); color: var(--dim); white-space: nowrap; }
      .events { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .ev { display: grid; grid-template-columns: 64px 1fr; gap: 18px; padding: 22px clamp(16px, 3vw, 28px); border-bottom: 1px solid var(--line); }
      .ev:nth-child(odd) { border-right: 1px solid var(--line); }
      .date { height: 68px; border-radius: 12px; overflow: hidden; display: grid; grid-template-rows: 22px 1fr; text-align: center; background: var(--surface-2); border: 1px solid var(--line-2); }
      .mon { background: var(--accent); color: var(--accent-ink); font: 700 11px/22px var(--font-sans); text-transform: uppercase; letter-spacing: .06em; }
      [data-type="speaking"] .mon { background: var(--violet); color: #12091f; }
      .yr { display: grid; place-items: center; font: 700 17px/1 var(--font-display); }
      .row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 0; font: 500 12px/1 var(--font-mono); }
      .role { padding: 4px 8px; border-radius: 6px; background: var(--accent-soft); color: var(--accent); }
      .role[data-r="speaker"] { background: color-mix(in srgb, var(--violet) 16%, transparent); color: var(--violet); }
      .role[data-r="judge"] { background: color-mix(in srgb, var(--info) 16%, transparent); color: var(--info); }
      .where { color: var(--dim); }
      .hi { color: var(--warn); }
      h3 { margin: 10px 0 0; font: 600 18px/1.25 var(--font-display); letter-spacing: -.01em; }
      .org { margin: 4px 0 0; color: var(--text); opacity: .75; font-size: 14px; }
      .desc { margin: 8px 0 0; color: var(--muted); font-size: 14.5px; line-height: 1.6; }
      @media (max-width: 860px) { .events { grid-template-columns: 1fr; } .ev:nth-child(odd) { border-right: 0; } }
      @media (max-width: 520px) { .ev { grid-template-columns: 52px 1fr; gap: 14px; } .date { height: 58px; } }
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

  private readonly events: IEvent[] = communityEntries
    .map((e) => {
      const [mon, y] = e.date.split(' ');
      const year = Number(y);
      return { e, mon, year, key: year * 12 + Math.max(0, MONTHS.indexOf(mon)) };
    })
    .sort((a, b) => b.key - a.key);

  readonly visible = computed(() => this.events.filter((ev) => this.filter() === 'all' || ev.e.type === this.filter()));

  readonly months = (() => {
    if (!this.events.length) return [];
    const keys = this.events.map((e) => e.key);
    const out: { key: number; mon: string; year: number; count: number }[] = [];
    for (let k = Math.min(...keys); k <= Math.max(...keys); k++) {
      out.push({ key: k, mon: MONTHS[k % 12], year: Math.floor(k / 12), count: keys.filter((x) => x === k).length });
    }
    return out;
  })();

  clean(s: string): string {
    return s.replace(/"/g, '');
  }
}
