import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

@Component({
  selector: 'os-about',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="os-section os-container" aria-labelledby="about-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">01 — about.md</span>
          <h2 id="about-title" class="os-h2">Builder turned teacher.<br /><span class="mute">Still a builder.</span></h2>
        </div>
      </div>

      <os-window title="about.md" icon="◐" [flush]="true" osReveal="80">
        <span osBar class="os-chip">markdown · preview</span>
        <div class="grid">
          <article class="md">
            @for (p of paragraphs; track $index) {
              <h3><span>##</span> {{ p.h }}</h3>
              <p>{{ p.t }}</p>
            }
          </article>
          <aside class="facts" aria-label="Quick facts">
            <p class="facts-h">// quick facts</p>
            <dl>
              @for (f of facts; track f[0]) {
                <div><dt>{{ f[0] }}</dt><dd>{{ f[1] }}</dd></div>
              }
            </dl>
            <div class="quote">
              “Explaining something well turns out to be harder than building it.”
            </div>
          </aside>
        </div>
      </os-window>
    </section>
  `,
  styles: [
    `
      .mute { color: var(--dim); }
      .grid { display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); }
      .md { padding: clamp(22px, 3.4vw, 40px); counter-reset: ln; }
      .md h3 { margin: 26px 0 8px; font: 600 15px/1.3 var(--font-mono); color: var(--text); }
      .md h3:first-child { margin-top: 0; }
      .md h3 span { color: var(--accent); }
      .md p { margin: 0; color: var(--muted); font-size: 16.5px; line-height: 1.7; max-width: 62ch; }
      .facts { padding: clamp(22px, 3.4vw, 40px); border-left: 1px solid var(--line); background: var(--surface-2); }
      .facts-h { margin: 0 0 14px; font: 500 12px/1 var(--font-mono); color: var(--dim); }
      dl { margin: 0; }
      dl div { display: grid; grid-template-columns: 96px 1fr; gap: 12px; padding: 11px 0; border-top: 1px dashed var(--line-2); }
      dl div:first-child { border-top: 0; }
      dt { font: 500 12.5px/1.5 var(--font-mono); color: var(--dim); }
      dd { margin: 0; font-size: 14.5px; line-height: 1.5; }
      .quote {
        margin-top: 22px; padding: 16px 18px; border-radius: 10px; background: var(--accent-soft); color: var(--text);
        font: 500 17px/1.35 var(--font-display); letter-spacing: -.01em; border-left: 3px solid var(--accent);
      }
      @media (max-width: 860px) { .grid { grid-template-columns: 1fr; } .facts { border-left: 0; border-top: 1px solid var(--line); } }
    `,
  ],
})
export class AboutComponent {
  readonly paragraphs = [
    {
      h: 'Four years at Commudle',
      t: `I started at Commudle as an intern in 2022 and left four years later as lead developer. In between I built most of
          what I'm proud of: a hackathon platform taken from an empty repo to production, a payments integration that runs
          real money, a frontend that got measurably faster. Angular and Ruby on Rails are where I'm most at home.`,
    },
    {
      h: 'Now: teaching the technical side',
      t: `In August 2026 I moved into training delivery at Google Operations Center. It's a change of job, not a change of
          field. The work is still technical, just pointed at helping people learn rather than shipping features myself.
          Explaining something well turns out to be harder than building it, which is most of why I took the role.`,
    },
    {
      h: 'Off the clock',
      t: `I mentor and judge at hackathons, run workshops for students, and write about what I learn. I build side projects
          because I like building things, and because teaching stays honest when you're still making things yourself.`,
    },
  ].map((p) => ({ ...p, t: p.t.replace(/\s+/g, ' ').trim() }));

  readonly facts: [string, string][] = [
    ['based', 'Delhi NCR, India'],
    ['now', 'Training Delivery Specialist, Google Operations Center'],
    ['before', 'Lead Software Developer, Commudle'],
    ['stack', 'Angular, Ruby on Rails, TypeScript, PostgreSQL'],
    ['degree', 'B.Tech, Information Technology'],
    ['off-hours', 'Hackathons, workshops, writing, side projects'],
  ];
}
