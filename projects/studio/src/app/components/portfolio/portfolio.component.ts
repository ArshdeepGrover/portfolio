import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { visibleStudioProjects } from '@stores/studio_projects_store';
import { IStudioProject } from '@models/studio-project.model';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  allProjects: IStudioProject[] = visibleStudioProjects;
  filteredProjects: IStudioProject[] = visibleStudioProjects;
  activeFilter: string = 'all';

  filters = [
    { label: 'All', value: 'all' },
    { label: 'Web Design', value: 'web' },
    { label: 'Product Design', value: 'product' },
    { label: 'Branding', value: 'branding' },
  ];

  filterProjects(category: string) {
    this.activeFilter = category;
    this.filteredProjects =
      category === 'all'
        ? this.allProjects
        : this.allProjects.filter((p) => p.category === category);
  }
}
