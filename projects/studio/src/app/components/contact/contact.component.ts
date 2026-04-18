import { AfterViewInit, Component, inject } from '@angular/core';
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
export class ContactComponent implements AfterViewInit {
  private http = inject(HttpClient);

  ngAfterViewInit(): void {
    // Trigger AOS-like fade-in animations on this standalone route.
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
