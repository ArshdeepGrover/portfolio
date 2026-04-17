import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  private http = inject(HttpClient);

  formData = {
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  };

  budgetOptions = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
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
        _subject: `Studio Contact: ${this.formData.name}`,
        name: this.formData.name,
        email: this.formData.email,
        company: this.formData.company,
        budget: this.formData.budget,
        message: this.formData.message,
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          this.formData = { name: '', email: '', company: '', budget: '', message: '' };
          setTimeout(() => (this.submitted = false), 5000);
        },
        error: () => {
          this.error = true;
          this.submitting = false;
          setTimeout(() => (this.error = false), 5000);
        },
      });
  }
}
