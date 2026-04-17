import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-submit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.scss'],
})
export class SubmitProjectComponent {
  private http = inject(HttpClient);

  formData = {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    referenceLinks: '',
  };

  projectTypes = [
    'Web Design',
    'Product Design',
    'UI/UX Design',
    'Brand Identity',
    'Full-Stack Development',
    'Other',
  ];

  budgetOptions = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
  ];

  timelineOptions = [
    'Less than 1 month',
    '1 - 3 months',
    '3 - 6 months',
    '6+ months',
    'Flexible',
  ];

  submitted = false;
  submitting = false;
  error = false;

  onSubmit() {
    if (this.submitting) return;
    this.submitting = true;
    this.error = false;

    this.http
      .post('https://formspree.io/f/xpwzgkby', {
        _subject: `New Project Request: ${this.formData.projectType} — ${this.formData.name}`,
        name: this.formData.name,
        email: this.formData.email,
        company: this.formData.company,
        projectType: this.formData.projectType,
        budget: this.formData.budget,
        timeline: this.formData.timeline,
        description: this.formData.description,
        referenceLinks: this.formData.referenceLinks,
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
        },
        error: () => {
          this.error = true;
          this.submitting = false;
          setTimeout(() => (this.error = false), 5000);
        },
      });
  }

  resetForm() {
    this.submitted = false;
    this.formData = {
      name: '',
      email: '',
      company: '',
      projectType: '',
      budget: '',
      timeline: '',
      description: '',
      referenceLinks: '',
    };
  }
}
