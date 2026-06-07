import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CaseStudyService } from '../../services/case-study.service';
import { ICaseStudy } from '../../models/case-study.model';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './case-studies.component.html',
  styleUrls: ['./case-studies.component.scss'],
})
export class CaseStudiesComponent implements OnInit {
  private service    = inject(CaseStudyService);
  private seoService = inject(SeoService);

  caseStudies: ICaseStudy[] = [];
  loading = true;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.seoService.updateTitle('Case Studies | Studio.Arshdeep');
    this.seoService.updateCanonicalUrl('https://studio.arshdeepgrover.dev/case-studies');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Real client projects — challenges, solutions, and measurable results by Arshdeep Studio.' },
      { property: 'og:title', content: 'Case Studies | Studio.Arshdeep' },
    ]);

    this.service.getAll().subscribe({
      next: (data) => { this.caseStudies = data; this.loading = false; },
      error: ()   => { this.loading = false; },
    });
  }
}
