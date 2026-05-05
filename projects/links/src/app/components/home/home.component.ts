import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  NgZone,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ILink } from '@models/link.model';
import { links } from '@stores/links_store';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit, OnDestroy, OnInit {
  private sanitizer = inject(DomSanitizer);
  private ngZone = inject(NgZone);
  private seoService = inject(SeoService);

  ngOnInit() {
    this.seoService.updateTitle('Arshdeep Singh — Links Hub');
    this.seoService.updateCanonicalUrl('https://links.arshdeepgrover.dev/');
    this.seoService.updateMetaTags([
      {
        name: 'description',
        content:
          'Explore all professional links for Arshdeep Singh — Lead Software Developer. Connect on LinkedIn, GitHub, X, and more.',
      },
      { property: 'og:title', content: 'Arshdeep Singh — Links Hub' },
      {
        property: 'og:description',
        content:
          'Find my social media, blog, portfolio, and studio links in one place.',
      },
      { property: 'og:url', content: 'https://links.arshdeepgrover.dev/' },
    ]);
  }

  private readonly ICONS: Record<string, string> = {
    linkedin:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    gitlab:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.845.904c-.435 0-.82.28-.955.692C2.639 5.449 1.246 9.728.07 13.335a1.437 1.437 0 00.522 1.607l11.071 8.045c.2.145.472.144.67-.004l11.073-8.04a1.436 1.436 0 00.522-1.61c-1.285-3.942-2.683-8.256-3.817-11.746a1.004 1.004 0 00-.957-.684.987.987 0 00-.949.69l-2.405 7.408H8.203l-2.41-7.408a.987.987 0 00-.942-.69h-.006z"/></svg>',
    medium:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>',
    devto:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6.14v4.41h.44c.38 0 .66-.08.84-.23.21-.18.31-.51.31-.97v-2.01c0-.46-.1-.79-.31-.97zM0 0v24h24V0H0zm8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.29 2.72 0 2.17-.02 2.3-.44 3.15zm4.93-5.77c0 .2-.18.37-.37.37h-1.62v2.3h1.2c.2 0 .38.17.38.37v.84c0 .2-.18.38-.38.38h-1.2v2.41h1.62c.2 0 .37.17.37.37v.84c0 .2-.17.37-.37.37H9.5c-.2 0-.38-.17-.38-.37V8.9c0-.2.18-.37.38-.37h4c.2 0 .37.17.37.37v.66zm4.1 6.78c-.51.69-1.18.88-1.95.4-.52-.33-.73-.74-.82-1.93l-.24-3.1c-.06-.66-.02-1.1.34-1.65.52-.79 1.68-.96 2.38-.37.35.3.51.63.55 1.18l.14 3.1c.07.91-.04 1.58-.4 2.37z"/></svg>',
    stackoverflow:
      '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15 21H3v-8h2v6h8v-6h2v8zm2.4-11.8l-1.4-1.3-7.7 3.1 1.4 1.3 7.7-3.1zm-1.8-3.5l-1.2-1.5-6.5 5.4 1.2 1.5 6.5-5.4zm-2.5-3.3L11.6 1l-5 6.9 1.5 1.4 5-6.9zM9 16h6v-2H9v2z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    topmate:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>',
    calendly:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    globe:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
    file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>',
    share:
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>',
  };

  shareStatus: 'idle' | 'copied' = 'idle';
  searchQuery = '';

  visibleLinks = links
    .filter((link) => link.show)
    .map((link) => ({
      ...link,
      safeSvg:
        link.iconType === 'svg'
          ? this.sanitizer.bypassSecurityTrustHtml(this.ICONS[link.icon] || '')
          : null,
      imageUrl: link.iconType === 'image' ? link.icon : null,
    }));

  get filteredLinks() {
    const q = this.searchQuery.trim().toLowerCase();
    if (!q) return this.visibleLinks;
    return this.visibleLinks.filter(
      (link) =>
        link.title.toLowerCase().includes(q) ||
        link.description.toLowerCase().includes(q) ||
        link.category.toLowerCase().includes(q),
    );
  }

  onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  private mouseX = 0;
  private mouseY = 0;
  private glowEl!: HTMLElement;
  private mouseMoveHandler = (e: MouseEvent) => this.handleMouseMove(e);

  ngAfterViewInit(): void {
    this.initCursorGlow();
    this.initCardEffects();

    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.mouseMoveHandler);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    this.glowEl?.remove();
  }

  private initCursorGlow(): void {
    this.glowEl = document.createElement('div');
    this.glowEl.classList.add('cursor-glow');
    document.body.appendChild(this.glowEl);
  }

  private handleMouseMove(e: MouseEvent): void {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Cursor glow
    this.glowEl.style.transform = `translate(${this.mouseX}px, ${this.mouseY}px)`;

    // Parallax orbs — each orb shifts at a different speed for depth
    const offsetX = (this.mouseX - window.innerWidth / 2) / window.innerWidth;
    const offsetY = (this.mouseY - window.innerHeight / 2) / window.innerHeight;

    const orbs = document.querySelectorAll('.orb');
    orbs.forEach((orb, i) => {
      const speed = (i + 1) * 20; // 20px, 40px, 60px
      (orb as HTMLElement).style.translate =
        `${offsetX * speed}px ${offsetY * speed}px`;
    });

    // Magnetic effect for cards
    const cards = document.querySelectorAll('.link-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(this.mouseX - cardCenterX, 2) +
          Math.pow(this.mouseY - cardCenterY, 2),
      );

      if (distance < 120) {
        const strength = (120 - distance) / 120;
        const moveX = (this.mouseX - cardCenterX) * strength * 0.1;
        const moveY = (this.mouseY - cardCenterY) * strength * 0.1;
        const rotation = (this.mouseX - cardCenterX) * strength * 0.02;

        (card as HTMLElement).style.transform =
          `translate(${moveX}px, ${moveY}px) rotateY(${rotation}deg) scale(${1 + strength * 0.02})`;
      } else {
        (card as HTMLElement).style.transform = '';
      }
    });
  }

  // Staggered card entrance
  private initCardEffects(): void {
    setTimeout(() => {
      const cards = document.querySelectorAll('.link-card');
      cards.forEach((card, index) => {
        (card as HTMLElement).style.animationDelay = `${index * 0.06}s`;
        (card as HTMLElement).style.animation = `cardSlideIn 0.6s ease both`;
      });
    }, 100);
  }

  async onShare(): Promise<void> {
    const shareData = {
      title: 'Arshdeep Singh | Links',
      text: 'Check out my professional links and portfolio!',
      url: `${window.location.origin}${window.location.pathname}?utm_source=share&utm_medium=links_page`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        this.showShareStatus();
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        await navigator.clipboard.writeText(shareData.url);
        this.showShareStatus();
      }
    }
  }

  private showShareStatus(): void {
    this.shareStatus = 'copied';
    setTimeout(() => {
      this.shareStatus = 'idle';
    }, 2000);
  }
}
