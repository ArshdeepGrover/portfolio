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
    message: '',
  };



  submitted = false;
  submitting = false;
  error = false;

  onSubmit() {
    if (this.submitting) return;
    this.submitting = true;
    this.error = false;

    const formData = new FormData();
    formData.append('access_key', '8e889d8d-2fca-4a43-a5b8-5b5a60bd7a95');
    formData.append('name', this.formData.name);
    formData.append('email', this.formData.email);
    formData.append('company', this.formData.company);
    formData.append('message', this.formData.message);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    })
      .then(async (response: Response) => {
        if (response.ok) {
          this.submitted = true;
          this.submitting = false;
          this.formData = {
            name: "",
            email: "",
            company: "",
            message: "",
          };
          setTimeout(() => (this.submitted = false), 5000);
        } else {
          alert(
            "Something went wrong. You can reach out from links.arshdeepgrover.dev"
          );
          this.error = true;
          this.submitting = false;
          setTimeout(() => (this.error = false), 5000);
        }
      })
      .catch((error: any) => {
        console.error("Submission error:", error);
        alert(
          "Something went wrong. You can reach out from links.arshdeepgrover.dev"
        );
        this.error = true;
        this.submitting = false;
        setTimeout(() => (this.error = false), 5000);
      });
  }
}
