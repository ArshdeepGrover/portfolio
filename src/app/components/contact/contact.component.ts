import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    // Initialize animations after view is ready
    this.initializeAnimations();
  }

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    // Prepare form data for Formspree
    const formData = {
      name: this.contactForm.name,
      email: this.contactForm.email,
      subject: this.contactForm.subject,
      message: this.contactForm.message,
    };

    // Submit to Formspree
    this.http
      .post('https://formspree.io/f/xgokabda', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .subscribe({
        next: (response) => {
          this.submitSuccess = true;
          this.submitMessage =
            'Thank you for your message! I will get back to you soon.';
          this.resetForm();
          this.isSubmitting = false;

          // Clear success message after 5 seconds
          setTimeout(() => {
            this.submitMessage = '';
            this.submitSuccess = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Form submission error:', error);
          this.submitSuccess = false;
          this.submitMessage =
            'Sorry, there was an error sending your message. Please try again or contact me directly via email.';
          this.isSubmitting = false;

          // Clear error message after 5 seconds
          setTimeout(() => {
            this.submitMessage = '';
          }, 5000);
        },
      });
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
    };
  }

  private initializeAnimations() {
    // Simple fade-in animation implementation
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }
}
