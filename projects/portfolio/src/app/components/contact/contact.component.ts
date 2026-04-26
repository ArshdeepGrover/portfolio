import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SeoService } from '@shared/services/seo.service';

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

  emailCopied = false;

  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(
    private http: HttpClient,
    private seoService: SeoService
  ) { }

  ngOnInit() {
    this.seoService.updateTitle('Contact | Arshdeep Singh');
    this.seoService.updateCanonicalUrl('https://arshdeepgrover.dev/contact');
    this.seoService.updateMetaTags([
      { name: 'description', content: 'Contact Arshdeep Singh for collaboration on software development, UI/UX design, or product engineering projects.' },
      { property: 'og:title', content: 'Contact | Arshdeep Singh' },
      { property: 'og:description', content: 'Get in touch for your next digital project.' },
      { property: 'og:url', content: 'https://arshdeepgrover.dev/contact' }
    ]);
  }



  ngAfterViewInit() {
    // Initialize animations after view is ready
    this.initializeAnimations();
  }

  onSubmit() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;
    this.submitMessage = '';

    const formData = new FormData();
    formData.append('access_key', '38c04ba8-73bf-48cb-a3a6-abf1a8a1acfd');
    formData.append('name', this.contactForm.name);
    formData.append('email', this.contactForm.email);
    formData.append('subject', this.contactForm.subject);
    formData.append('message', this.contactForm.message);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(async (response: Response) => {
        const data = await response.json();
        if (response.ok) {
          this.submitSuccess = true;
          this.submitMessage =
            'Thank you for your message! I will get back to you soon.';
          this.resetForm();
        } else {
          alert('Something went wrong. You can reach out from links.arshdeepgrover.dev');
          this.submitSuccess = false;
          this.submitMessage = 'Error sending message.';
        }
      })
      .catch((error: any) => {
        console.error('Form submission error:', error);
        alert('Something went wrong. You can reach out from links.arshdeepgrover.dev');
        this.submitSuccess = false;
        this.submitMessage =
          'Sorry, there was an error sending your message. Please try again or reach out through links.arshdeepgrover.dev';
      })
      .finally(() => {
        this.isSubmitting = false;
        // Clear status message after 5 seconds
        setTimeout(() => {
          this.submitMessage = '';
          this.submitSuccess = false;
        }, 5000);
      });
  }

  copyEmail() {
    navigator.clipboard.writeText('arshdeepgroverdev@gmail.com').then(() => {
      this.emailCopied = true;
      setTimeout(() => {
        this.emailCopied = false;
      }, 2000);
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
