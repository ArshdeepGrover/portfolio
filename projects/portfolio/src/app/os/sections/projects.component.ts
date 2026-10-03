import { ChangeDetectionStrategy, Component, HostListener, computed, signal } from '@angular/core';
import { portfolioProjects } from '@shared/stores/projects.store';
import { IProject } from '@shared/models/project.model';
import { WindowComponent } from '../ui/window.component';
import { RevealDirective } from '../ui/reveal.directive';

type Kind = 'Products' | 'Libraries' | 'Web apps';

interface IItem {
  p: IProject;
  name: string;
  tagline: string;
  kind: Kind;
  url?: string;
  source?: string;
}

function kindOf(p: IProject): Kind {
  const t = `${p.title} ${p.technologies.join(' ')}`.toLowerCase();
  if (/ruby gem|rubygems|npm|component library/.test(t)) return 'Libraries';
  if (/saas|website|freelance|writing|studio/.test(t)) return 'Products';
  return 'Web apps';
}

/** Projects as a Finder window: sidebar filters, grid/list views, Quick Look on click (or Space). */
@Component({
  selector: 'os-projects',
  standalone: true,
  imports: [WindowComponent, RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly items: IItem[] = portfolioProjects.map((p) => {
    const clean = p.title.replace(/^[^\w]+/, '').trim();
    const [name, ...rest] = clean.split(' - ');
    return {
      p,
      name: name.trim(),
      tagline: rest.join(' - ').trim() || p.technologies[0],
      kind: kindOf(p),
      url: p.demoLink || p.liveUrl || p.url,
      source: p.githubUrl,
    };
  });

  readonly kinds: ('All' | Kind)[] = ['All', 'Products', 'Libraries', 'Web apps'];
  readonly kind = signal<'All' | Kind>('All');
  readonly query = signal('');
  readonly view = signal<'grid' | 'list'>('grid');
  readonly selected = signal<IItem | null>(null);
  readonly preview = signal<IItem | null>(null);

  readonly visible = computed(() => {
    const q = this.query().trim().toLowerCase();
    return this.items.filter(
      (i) =>
        (this.kind() === 'All' || i.kind === this.kind()) &&
        (!q || `${i.p.title} ${i.p.description} ${i.p.technologies.join(' ')}`.toLowerCase().includes(q)),
    );
  });

  count(k: 'All' | Kind): number {
    return k === 'All' ? this.items.length : this.items.filter((i) => i.kind === k).length;
  }

  host(url?: string): string {
    if (!url) return '';
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }

  open(i: IItem): void {
    this.selected.set(i);
    this.preview.set(i);
    document.documentElement.style.overflow = 'hidden';
  }

  close(): void {
    this.preview.set(null);
    document.documentElement.style.overflow = '';
  }

  step(dir: 1 | -1): void {
    const list = this.visible();
    const cur = this.preview();
    if (!cur || !list.length) return;
    const next = list[(list.indexOf(cur) + dir + list.length) % list.length];
    this.preview.set(next);
    this.selected.set(next);
  }

  onCardKey(e: KeyboardEvent, i: IItem): void {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      this.open(i);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent): void {
    if (!this.preview()) return;
    if (e.key === 'Escape' || e.key === ' ') {
      e.preventDefault();
      this.close();
    } else if (e.key === 'ArrowRight') this.step(1);
    else if (e.key === 'ArrowLeft') this.step(-1);
  }
}
