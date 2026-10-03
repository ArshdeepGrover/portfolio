import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { SeoService } from '@shared/services/seo.service';
import { DesktopComponent } from './sections/desktop.component';
import { AboutComponent } from './sections/about.component';
import { ExperienceComponent } from './sections/experience.component';
import { ProjectsComponent } from './sections/projects.component';
import { SkillsComponent } from './sections/skills.component';
import { CommunityComponent } from './sections/community.component';
import { LibraryComponent } from './sections/library.component';
import { CertificatesComponent } from './sections/certificates.component';
import { ContactComponent } from './sections/contact.component';
import { StatusFooterComponent } from './sections/status-footer.component';

const TITLE = 'Arshdeep Singh | Full-Stack Developer & Technical Trainer';
const DESC =
  'Arshdeep Singh | full-stack developer working in Angular and Ruby on Rails, now delivering technical training at Google Operations Center. Based in Delhi NCR.';

@Component({
  selector: 'os-home',
  standalone: true,
  imports: [
    DesktopComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    SkillsComponent,
    CommunityComponent,
    LibraryComponent,
    CertificatesComponent,
    StatusFooterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <os-desktop />
    <os-about />
    <os-experience />
    <os-projects />
    <os-skills />
    <os-community />
    <os-library />
    <os-certificates />
    <os-status-footer />
  `,
})
export class OsHomeComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.updateTitle(TITLE);
    this.seo.updateCanonicalUrl('https://arshdeepgrover.dev/');
    this.seo.updateMetaTags([
      { name: 'description', content: DESC },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: 'Full-stack developer (Angular, Ruby on Rails) and technical trainer at Google Operations Center. Based in Delhi NCR.' },
      { property: 'og:url', content: 'https://arshdeepgrover.dev/' },
      { property: 'og:image', content: 'https://arshdeepgrover.dev/images/arshdeep-singh.png' },
    ]);
  }
}

/** /contact keeps working as its own page: just the mail window. */
@Component({
  selector: 'os-contact-page',
  standalone: true,
  imports: [ContactComponent, StatusFooterComponent],
  template: `<div style="min-height: calc(100svh - 160px)"><os-contact /></div><os-status-footer />`,
})
export class OsContactPageComponent implements OnInit {
  private seo = inject(SeoService);
  ngOnInit(): void {
    this.seo.updateTitle('Contact | Arshdeep Singh');
    this.seo.updateCanonicalUrl('https://arshdeepgrover.dev/contact');
  }
}
