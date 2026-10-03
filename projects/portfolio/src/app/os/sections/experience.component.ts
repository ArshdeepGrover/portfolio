import { ChangeDetectionStrategy, Component } from '@angular/core';
import { experiences } from '@stores/experience_store';
import { IExperience } from '@models/experience.model';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

interface ICommit {
  x: IExperience;
  hash: string;
  lane: number;
  color: string;
  period: string;
  span: string;
  refs: string[];
}

const LANE_COLORS = ['var(--accent)', 'var(--info)', 'var(--ok)', 'var(--violet)', 'var(--warn)'];
const fmt = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric' });

/** Work history as `git log --graph`: one commit per role, one branch colour per company. */
@Component({
  selector: 'os-experience',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="os-section os-container" aria-labelledby="exp-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">02 — git log --graph</span>
          <h2 id="exp-title" class="os-h2">Where I've worked</h2>
          <p class="os-lede">Newest first. Intern to lead at Commudle, then a move into training at Google Operations Center.</p>
        </div>
      </div>

      <os-window title="~/career — git log --graph --stat" icon="⎇" [flush]="true" osReveal="80">
        <span osBar class="os-chip">{{ commits.length }} commits · {{ companies }} branches</span>
        <ol class="log">
          @for (c of commits; track c.x.id; let last = $last) {
            <li class="commit" [style.--c]="c.color" [class.head]="!c.x.endDate">
              <div class="graph" aria-hidden="true">
                <span class="rail" [class.end]="last"></span>
                <span class="node"></span>
              </div>
              <div class="body">
                <p class="meta">
                  <span class="hash">{{ c.hash }}</span>
                  @for (r of c.refs; track r) { <span class="ref">{{ r }}</span> }
                  <span class="when">{{ c.period }} · {{ c.span }}</span>
                </p>
                <h3><span class="role">{{ c.x.role }}</span> <span class="at">&#64; {{ c.x.company }}</span></h3>
                @if (c.x.location) { <p class="loc">{{ c.x.location }}</p> }
                @if (c.x.description) { <p class="desc">{{ c.x.description }}</p> }
                @if (c.x.highlights?.length) {
                  <ul class="hl">
                    @for (h of c.x.highlights; track $index) { <li>{{ h }}</li> }
                  </ul>
                }
                @if (c.x.technologies?.length) {
                  <p class="tech">
                    @for (t of c.x.technologies; track t) { <span class="os-chip">{{ t }}</span> }
                  </p>
                }
              </div>
            </li>
          }
        </ol>
      </os-window>
    </section>
  `,
  styles: [
    `
      .log { list-style: none; margin: 0; padding: 12px 0; }
      .commit { display: grid; grid-template-columns: 56px 1fr; padding-right: clamp(16px, 3vw, 32px); }
      .graph { position: relative; }
      .rail { position: absolute; left: 27px; top: 0; bottom: 0; width: 2px; background: var(--line-2); }
      .commit:first-child .rail { top: 28px; }
      .rail.end { bottom: calc(100% - 28px); }
      .node {
        position: absolute; left: 21px; top: 22px; width: 14px; height: 14px; border-radius: 50%;
        background: var(--surface); border: 3px solid var(--c); z-index: 1;
      }
      .head .node { background: var(--c); box-shadow: 0 0 0 5px color-mix(in srgb, var(--c) 22%, transparent); }
      .body { padding: 16px 0 26px; border-bottom: 1px dashed var(--line); min-width: 0; }
      .commit:last-child .body { border-bottom: 0; }
      .meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin: 0; font: 500 12px/1.4 var(--font-mono); }
      .hash { color: var(--warn); }
      .ref { color: var(--c); border: 1px solid color-mix(in srgb, var(--c) 45%, transparent); border-radius: 5px; padding: 1px 6px; }
      .when { color: var(--dim); }
      h3 { margin: 8px 0 0; font: 600 clamp(18px, 2vw, 22px)/1.25 var(--font-display); letter-spacing: -.015em; }
      .at { color: var(--muted); font-weight: 500; margin-left: .25em; }
      .loc { margin: 2px 0 0; font: 500 12.5px/1.4 var(--font-mono); color: var(--dim); }
      .desc { margin: 10px 0 0; color: var(--muted); max-width: 70ch; }
      .hl { margin: 10px 0 0; padding: 0; list-style: none; display: grid; gap: 6px; max-width: 78ch; }
      .hl li { position: relative; padding-left: 20px; color: var(--muted); font-size: 15px; line-height: 1.55; }
      .hl li::before { content: '+'; position: absolute; left: 2px; color: var(--ok); font-family: var(--font-mono); }
      .tech { display: flex; flex-wrap: wrap; gap: 6px; margin: 14px 0 0; }
      @media (max-width: 640px) { .commit { grid-template-columns: 40px 1fr; } .rail { left: 19px; } .node { left: 13px; } }
    `,
  ],
})
export class ExperienceComponent {
  readonly commits: ICommit[];
  readonly companies: number;

  constructor() {
    const lanes = new Map<string, number>();
    const seen = new Set<string>();
    this.commits = experiences.map((x) => {
      if (!lanes.has(x.company)) lanes.set(x.company, lanes.size);
      const lane = lanes.get(x.company)!;
      const refs: string[] = [];
      if (!x.endDate) refs.push('HEAD → main');
      if (!seen.has(x.company)) {
        refs.push(x.company.toLowerCase().split(' ')[0]);
        seen.add(x.company);
      }
      return {
        x,
        lane,
        color: LANE_COLORS[lane % LANE_COLORS.length],
        hash: this.hash(`${x.company}${x.role}${x.startDate}`),
        period: `${fmt.format(new Date(x.startDate))} – ${x.endDate ? fmt.format(new Date(x.endDate)) : 'now'}`,
        span: this.span(x.startDate, x.endDate),
        refs,
      };
    });
    this.companies = lanes.size;
  }

  /** Stable, fake-but-plausible short hash. */
  private hash(s: string): string {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
    return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
  }

  private span(start: string, end: string | null): string {
    const a = new Date(start);
    const b = end ? new Date(end) : new Date();
    const months = Math.max(1, (b.getFullYear() - a.getFullYear()) * 12 + b.getMonth() - a.getMonth() + (end ? 1 : 0));
    const y = Math.floor(months / 12);
    const m = months % 12;
    return [y ? `${y} yr${y > 1 ? 's' : ''}` : '', m ? `${m} mo` : ''].filter(Boolean).join(' ');
  }
}
