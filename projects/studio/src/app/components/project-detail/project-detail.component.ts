import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { studioProjects, visibleStudioProjects } from '@stores/studio_projects_store';
import { IStudioProject } from '@models/studio-project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit, AfterViewInit {
  project: IStudioProject | undefined;
  otherProjects: IStudioProject[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.project = studioProjects.find((p) => p.id === id);
      this.otherProjects = visibleStudioProjects.filter((p) => p.id !== id).slice(0, 3);
      window.scrollTo({ top: 0 });
    });
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll('[data-aos]')
        .forEach((el) => el.classList.add('animate-fade-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el));
  }

  prettyUrl(url?: string): string {
    if (!url) return '';
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  categoryEmoji(category?: string): string {
    switch (category) {
      case 'web':
        return '🌐';
      case 'product':
        return '📱';
      case 'branding':
        return '✨';
      default:
        return '💼';
    }
  }
}
