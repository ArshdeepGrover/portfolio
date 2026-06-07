import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CaseStudyService } from '../../services/case-study.service';
import { ICaseStudy } from '../../models/case-study.model';

@Component({
  selector: 'app-case-study-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './case-study-detail.component.html',
  styleUrls: ['./case-study-detail.component.scss'],
})
export class CaseStudyDetailComponent implements OnInit {
  private route   = inject(ActivatedRoute);
  private service = inject(CaseStudyService);

  cs:      ICaseStudy | null = null;
  loading = true;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    this.service.getBySlug(slug).subscribe({
      next: (data) => { this.cs = data; this.loading = false; },
      error: ()   => { this.loading = false; },
    });
  }
}
