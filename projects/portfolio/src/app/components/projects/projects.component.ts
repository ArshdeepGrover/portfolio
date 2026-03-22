import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IProject } from '@shared/models/project.model';
import { portfolioProjects } from '@shared/stores/projects.store';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  projects: IProject[] = portfolioProjects.slice().sort((a, b) => b.id - a.id);

  openProject(url?: string): void {
    if (url) window.open(url, '_blank');
  }
}
