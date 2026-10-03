import { ChangeDetectionStrategy, Component, ElementRef, inject, signal } from '@angular/core';
import { communityEntries } from '@stores/community_store';
import { portfolioProjects } from '@shared/stores/projects.store';
import { CAT_NAME, OsService, PROFILE } from '../os.service';

interface IDeskWin {
  id: 'status' | 'me' | 'note' | 'shell';
  /** Position as % of the desktop area, so the layout survives resizes. */
  x: number;
  y: number;
  z: number;
}

/**
 * The hero is a desktop: a big headline on the left and a few small windows
 * you can drag around on the right (status.json, a photo, a sticky note, a
 * shell). On narrow screens the windows stack as a normal column.
 */
@Component({
  selector: 'os-desktop',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.scss',
})
export class DesktopComponent {
  readonly os = inject(OsService);
  readonly PROFILE = PROFILE;
  readonly catName = CAT_NAME;
  private host = inject(ElementRef<HTMLElement>);

  readonly mentored = communityEntries.filter((e) => e.type === 'volunteering').length;
  readonly talks = communityEntries.filter((e) => e.type === 'speaking').length;
  readonly shipped = portfolioProjects.length;

  readonly wins = signal<IDeskWin[]>([
    { id: 'status', x: 2, y: 6, z: 3 },
    { id: 'me', x: 58, y: 0, z: 2 },
    { id: 'note', x: 60, y: 58, z: 4 },
    { id: 'shell', x: 8, y: 62, z: 1 },
  ]);

  private topZ = 10;
  private drag?: { id: IDeskWin['id']; dx: number; dy: number; area: DOMRect; el: HTMLElement };

  win(id: IDeskWin['id']): IDeskWin {
    return this.wins().find((w) => w.id === id)!;
  }

  focus(id: IDeskWin['id']): void {
    this.wins.update((ws) => ws.map((w) => (w.id === id ? { ...w, z: ++this.topZ } : w)));
  }

  startDrag(e: PointerEvent, id: IDeskWin['id']): void {
    if (e.button !== 0 || window.innerWidth < 1024) return;
    if ((e.target as HTMLElement).closest('button, a')) return;
    const area = (this.host.nativeElement as HTMLElement).querySelector('.desk')!.getBoundingClientRect();
    const el = (e.currentTarget as HTMLElement).closest('.dw') as HTMLElement;
    const r = el.getBoundingClientRect();
    this.drag = { id, dx: e.clientX - r.left, dy: e.clientY - r.top, area, el };
    el.classList.add('dragging');
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.focus(id);
  }

  onDrag(e: PointerEvent): void {
    const d = this.drag;
    if (!d) return;
    const w = d.el.offsetWidth;
    const h = d.el.offsetHeight;
    const left = Math.max(-w * 0.4, Math.min(d.area.width - w * 0.6, e.clientX - d.area.left - d.dx));
    const top = Math.max(-8, Math.min(d.area.height - 40, e.clientY - d.area.top - d.dy));
    const x = (left / d.area.width) * 100;
    const y = (top / d.area.height) * 100;
    this.wins.update((ws) => ws.map((win) => (win.id === d.id ? { ...win, x, y } : win)));
  }

  endDrag(): void {
    this.drag?.el.classList.remove('dragging');
    this.drag = undefined;
  }
}
