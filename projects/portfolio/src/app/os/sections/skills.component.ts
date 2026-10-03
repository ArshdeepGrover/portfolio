import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { otherTechnologies, skillCategories } from '@stores/skills_store';
import { ISkill } from '@models/skill.model';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

type Line =
  | { t: 'raw'; html: string; indent: number }
  | { t: 'open'; key: string; cat: number; indent: number; count: number }
  | { t: 'close'; indent: number; comma: boolean; cat?: number }
  | { t: 'skill'; s: ISkill; cat: number; indent: number; comma: boolean };

const LEVEL: Record<ISkill['proficiency'], number> = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

/**
 * Skills as a package.json you can poke at: categories fold, every line is
 * hoverable, and the inspector on the right explains the selected skill.
 */
@Component({
  selector: 'os-skills',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="os-section os-container" aria-labelledby="skills-title">
      <div class="os-head" osReveal>
        <div>
          <span class="os-kicker">04 — package.json</span>
          <h2 id="skills-title" class="os-h2">What I work with</h2>
          <p class="os-lede">Every dependency is real and in use. Hover or tap a line to inspect it; click a key to fold it.</p>
        </div>
      </div>

      <os-window title="package.json" icon="{}" [flush]="true" osReveal="80">
        <span osBar class="os-chip">{{ total }} deps · JSON</span>
        <div class="split">
          <div class="editor" role="list">
            @for (l of lines(); track $index; let n = $index) {
              <div class="ln" role="listitem" [style.padding-left.ch]="l.indent * 2 + 6" [attr.data-n]="n + 1"
                [class.sel]="l.t === 'skill' && l.s === selected()">
                @switch (l.t) {
                  @case ('raw') { <span [innerHTML]="l.html"></span> }
                  @case ('open') {
                    <button type="button" class="fold" (click)="toggle(l.cat)" [attr.aria-expanded]="!folded().has(l.cat)">
                      <span class="caret" [class.closed]="folded().has(l.cat)">▾</span><span class="k">"{{ l.key }}"</span><span class="p">: {{ '{' }}</span>
                      @if (folded().has(l.cat)) { <span class="more">… {{ l.count }} {{ '}' }},</span> }
                    </button>
                  }
                  @case ('close') { <span class="p">{{ '}' }}{{ l.comma ? ',' : '' }}</span> }
                  @case ('skill') {
                    <button type="button" class="dep" (mouseenter)="selected.set(l.s)" (focus)="selected.set(l.s)" (click)="selected.set(l.s)">
                      <span class="k">"{{ slug(l.s.name) }}"</span><span class="p">: </span><span class="v" [attr.data-l]="l.s.proficiency">"{{ ver(l.s) }}"</span><span class="p">{{ l.comma ? ',' : '' }}</span>
                    </button>
                  }
                }
              </div>
            }
          </div>

          <aside class="inspector" aria-live="polite">
            <p class="ins-h">Inspector</p>
            @if (selected(); as s) {
              <div class="ins-top">
                <span class="logo">
                  @if (isUrl(s.icon)) { <img [src]="s.icon" [alt]="''" width="34" height="34" loading="lazy" /> } @else { {{ s.icon || '◆' }} }
                </span>
                <div>
                  <h3>{{ s.name }}</h3>
                  <p class="cat">{{ catName(s) }}</p>
                </div>
              </div>
              <p class="desc">{{ s.description }}</p>
              <div class="meter" [attr.aria-label]="'Proficiency: ' + s.proficiency">
                @for (i of [1, 2, 3, 4]; track i) { <span [class.on]="i <= level(s)"></span> }
              </div>
              <p class="lvl">{{ s.proficiency }}</p>
            }
            <p class="ins-h peer">Also used</p>
            <div class="peers">
              @for (o of others; track o.name) {
                <span class="os-chip"><img [src]="o.icon" [alt]="''" width="14" height="14" loading="lazy" />{{ o.name }}</span>
              }
            </div>
          </aside>
        </div>
      </os-window>
    </section>
  `,
  styles: [
    `
      button { all: unset; cursor: pointer; }
      button:focus-visible { outline: 2px solid var(--accent); border-radius: 4px; }
      .split { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(280px, 1fr); }
      .editor { padding: 14px 0 20px; font: 13.5px/1.85 var(--font-mono); color: var(--muted); overflow-x: auto; background: var(--bg-2); counter-reset: n; }
      .ln { position: relative; white-space: pre; min-height: 1.85em; }
      .ln::before { content: attr(data-n); position: absolute; left: 0; width: 4ch; text-align: right; color: var(--dim); opacity: .6; user-select: none; }
      .ln:hover { background: color-mix(in srgb, var(--surface-3) 55%, transparent); }
      .ln.sel { background: var(--accent-soft); }
      .ln.sel::after { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 2px; background: var(--accent); }
      .k { color: var(--info); } .p { color: var(--muted); } :host ::ng-deep .s { color: var(--accent); } :host ::ng-deep .c { color: var(--dim); font-style: italic; }
      :host ::ng-deep .kk { color: var(--info); }
      .v { color: var(--accent); }
      .v[data-l="intermediate"] { color: var(--warn); } .v[data-l="beginner"] { color: var(--dim); } .v[data-l="expert"] { color: var(--ok); }
      .caret { display: inline-block; width: 2ch; margin-left: -2ch; color: var(--dim); transition: transform .2s; }
      .caret.closed { transform: rotate(-90deg); }
      .more { color: var(--dim); margin-left: 6px; }
      .inspector { padding: 22px; border-left: 1px solid var(--line); background: var(--surface); }
      .ins-h { margin: 0 0 14px; font: 600 11px/1 var(--font-mono); color: var(--dim); text-transform: uppercase; letter-spacing: .08em; }
      .ins-top { display: flex; gap: 14px; align-items: center; }
      .logo { width: 52px; height: 52px; flex: none; border-radius: 12px; display: grid; place-items: center; font-size: 24px; background: var(--surface-2); border: 1px solid var(--line-2); }
      .logo img { width: 30px; height: 30px; object-fit: contain; }
      h3 { margin: 0; font: 700 22px/1.1 var(--font-display); letter-spacing: -.02em; }
      .cat { margin: 4px 0 0; font: 500 12px/1 var(--font-mono); color: var(--dim); }
      .desc { margin: 16px 0 0; color: var(--muted); font-size: 15px; min-height: 3em; }
      .meter { display: grid; grid-template-columns: repeat(4, 1fr); gap: 5px; margin-top: 16px; }
      .meter span { height: 6px; border-radius: 3px; background: var(--surface-3); }
      .meter span.on { background: var(--accent); }
      .lvl { margin: 8px 0 0; font: 500 12px/1 var(--font-mono); color: var(--muted); text-transform: capitalize; }
      .peer { margin-top: 30px; }
      .peers { display: flex; flex-wrap: wrap; gap: 6px; }
      .peers img { width: 14px; height: 14px; object-fit: contain; }
      @media (max-width: 860px) { .split { grid-template-columns: 1fr; } .inspector { border-left: 0; border-top: 1px solid var(--line); order: -1; } .editor { font-size: 12.5px; } }
    `,
  ],
})
export class SkillsComponent {
  readonly cats = skillCategories;
  readonly others = otherTechnologies;
  readonly total = skillCategories.reduce((n, c) => n + c.skills.length, 0) + otherTechnologies.length;
  readonly selected = signal<ISkill | null>(
    skillCategories.flatMap((c) => c.skills).find((s) => s.name === 'Angular') ?? skillCategories[0]?.skills[0] ?? null,
  );
  readonly folded = signal<Set<number>>(new Set());

  readonly lines = computed<Line[]>(() => {
    const f = this.folded();
    const out: Line[] = [
      { t: 'raw', indent: 0, html: '<span class="p">{</span>' },
      { t: 'raw', indent: 1, html: '<span class="kk">"name"</span>: <span class="s">"arshdeep"</span>,' },
      { t: 'raw', indent: 1, html: '<span class="kk">"version"</span>: <span class="s">"4.2.0"</span>, <span class="c">// years.months shipping</span>' },
      { t: 'raw', indent: 1, html: '<span class="kk">"license"</span>: <span class="s">"open-to-work"</span>,' },
    ];
    this.cats.forEach((c, ci) => {
      out.push({ t: 'open', key: this.slug(c.name), cat: ci, indent: 1, count: c.skills.length });
      if (!f.has(ci)) {
        c.skills.forEach((s, si) => out.push({ t: 'skill', s, cat: ci, indent: 2, comma: si < c.skills.length - 1 }));
        out.push({ t: 'close', indent: 1, comma: ci < this.cats.length - 1, cat: ci });
      }
    });
    out.push({ t: 'raw', indent: 0, html: '<span class="p">}</span>' });
    return out;
  });

  toggle(ci: number): void {
    this.folded.update((s) => {
      const n = new Set(s);
      n.has(ci) ? n.delete(ci) : n.add(ci);
      return n;
    });
  }

  slug(s: string): string {
    return s
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9.+#]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  ver(s: ISkill): string {
    return { beginner: '~', intermediate: '^', advanced: '^', expert: '' }[s.proficiency] + s.proficiency;
  }

  level(s: ISkill): number {
    return LEVEL[s.proficiency];
  }

  isUrl(v?: string): boolean {
    return !!v && /^(https?:)?\/\//.test(v);
  }

  catName(s: ISkill): string {
    return this.cats.find((c) => c.skills.includes(s))?.name ?? '';
  }
}
