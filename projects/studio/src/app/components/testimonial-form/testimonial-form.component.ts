import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CONTACT_INFO } from '@stores/contact_store';
import { SeoService } from '@shared/services/seo.service';

@Component({
  selector: 'app-testimonial-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './testimonial-form.component.html',
  styleUrls: ['./testimonial-form.component.scss'],
})
export class TestimonialFormComponent implements OnInit, AfterViewInit {
  private seoService = inject(SeoService);
  private router = inject(Router);
  readonly contact = CONTACT_INFO;

  countdown = 5;

  ngOnInit() {
    this.seoService.updateTitle('Leave a Testimonial | Studio.Arshdeep');
    this.seoService.updateCanonicalUrl('https://studio.arshdeepgrover.dev/testimonials');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Worked with Arshdeep Studio? Share your experience and leave a testimonial.' },
      { property: 'og:title', content: 'Leave a Testimonial | Studio.Arshdeep' },
      { property: 'og:description', content: 'Share your experience working with Arshdeep Studio.' },
      { property: 'og:url', content: 'https://studio.arshdeepgrover.dev/testimonials' },
    ]);
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('[data-aos]').forEach((el) => el.classList.add('animate-fade-in'));
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
    name:       '',
    role:       '',
    company:    '',
    service:    '',
    workAgain:  '',
    message:    '',
    permission: false,
  };

  rating      = 0;
  hoverRating = 0;
  submitted   = false;
  submitting  = false;
  error       = false;

  readonly stars        = [1, 2, 3, 4, 5];
  readonly ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  readonly serviceOptions = [
    'Web Design',
    'Frontend Development',
    'Full-Stack App',
    'UI/UX Consulting',
    'Website Audit',
    'Other'
  ];

  readonly workAgainOptions = [
    { label: 'Yes, absolutely!', value: 'Yes' },
    { label: 'Maybe',            value: 'Maybe' },
    { label: 'Already have!',   value: 'Already have' },
  ];

  get activeRating(): number { return this.hoverRating || this.rating; }
  setRating(s: number)  { this.rating = s; }
  setHover(s: number)   { this.hoverRating = s; }
  clearHover()          { this.hoverRating = 0; }

  get isValid(): boolean {
    return !!this.formData.name &&
           !!this.formData.message &&
           this.rating > 0;
  }

  onSubmit(): void {
    console.log('Form submission started', { isValid: this.isValid, submitting: this.submitting });
    
    if (this.submitting || !this.isValid) return;
    
    this.submitting = true;
    this.error = false;
    this.submitted = false; // Ensure submitted is false during submission

    const ratingText = this.ratingLabels[this.rating] + ' (' + this.rating + '/5)';

    const fd = new FormData();
    fd.append('access_key', '8e889d8d-2fca-4a43-a5b8-5b5a60bd7a95');
    fd.append('subject',    'New Testimonial from ' + this.formData.name + ' - ' + ratingText);
    fd.append('name',       this.formData.name);
    fd.append('role',       this.formData.role    || 'N/A');
    fd.append('company',    this.formData.company || 'N/A');
    fd.append('service',    this.formData.service || 'N/A');
    fd.append('rating',     ratingText);
    fd.append('work_again', this.formData.workAgain || 'N/A');
    fd.append('message',    this.formData.message);
    fd.append('permission', this.formData.permission ? 'Yes - can display publicly' : 'No');

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      .then(async (response: Response) => {
        console.log('Form response received', { ok: response.ok, status: response.status });
        
        if (response.ok) {
          this.submitting = false;
          this.submitted  = true;
          console.log('Form submitted successfully, submitted state:', this.submitted);
          
          // Reset form after a short delay to ensure success message shows
          setTimeout(() => {
            this.resetForm();
          }, 100);
          
          // Start countdown and redirect
          this.startCountdown();
        } else {
          console.error('Form submission failed:', response.status);
          this.error      = true;
          this.submitting = false;
          setTimeout(() => (this.error = false), 5000);
        }
      })
      .catch((err: any) => {
        console.error('Submission error:', err);
        this.error      = true;
        this.submitting = false;
        setTimeout(() => (this.error = false), 5000);
      });
  }

  private resetForm(): void {
    this.formData    = { name: '', role: '', company: '', service: '', workAgain: '', message: '', permission: false };
    this.rating      = 0;
    this.hoverRating = 0;
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private startCountdown(): void {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(interval);
        this.goHome();
      }
    }, 1000);
  }
}
