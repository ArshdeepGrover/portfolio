import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ProjectTypeOption {
  value: string;
  label: string;
  icon: string;
  description: string;
  badge?: string;
}

interface NextStep {
  step: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-submit-project',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './submit-project.component.html',
  styleUrls: ['./submit-project.component.scss'],
})
export class SubmitProjectComponent implements AfterViewInit, OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Pre-select a project type from ?service=... query param, if present.
    this.route.queryParamMap.subscribe((params) => {
      const requested = params.get('service');
      if (!requested) return;

      const match = this.projectTypeOptions.find(
        (opt) =>
          opt.value.toLowerCase() === requested.toLowerCase() ||
          opt.label.toLowerCase() === requested.toLowerCase()
      );
      if (match) {
        this.formData.projectType = match.value;
      }
    });
  }

  ngAfterViewInit(): void {
    // Trigger AOS-like fade-in animations on this route, since
    // the IntersectionObserver in HomeComponent isn't running here.
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll('[data-aos]')
        .forEach((el) => el.classList.add('animate-fade-in'));
    } else {
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

    // Honor the URL fragment, e.g. /start-project#project-form.
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      // Wait for AOS class toggles and layout to settle before scrolling.
      setTimeout(() => this.scrollToFragment(fragment), 120);
    }
  }

  private scrollToFragment(fragment: string): void {
    const el = document.getElementById(fragment);
    if (!el) return;
    // Force the element visible so it isn’t skipped due to AOS opacity: 0.
    el.classList.add('animate-fade-in');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  formData = {
    name: '',
    email: '',
    company: '',
    websiteUrl: '',
    projectType: '',
    description: '',
    referenceLinks: '',
  };

  projectTypeOptions: ProjectTypeOption[] = [
    {
      value: 'Website Audit & Report',
      label: 'Website Audit & Report',
      icon: '📊',
      description: 'Performance, SEO, accessibility & UX report with action plan.',
      badge: 'New',
    },
    {
      value: 'Web Design',
      label: 'Web Design',
      icon: '🌐',
      description: 'Marketing sites and landing pages that convert.',
    },
    {
      value: 'Product Design',
      label: 'Product Design',
      icon: '📱',
      description: 'End-to-end product UX, flows and prototypes.',
    },
    {
      value: 'UI/UX Design',
      label: 'UI/UX Design',
      icon: '🎨',
      description: 'Design systems, polished interfaces, accessibility.',
    },
    {
      value: 'Brand Identity',
      label: 'Brand Identity',
      icon: '✨',
      description: 'Logos, color, typography and brand guidelines.',
    },
    {
      value: 'Other',
      label: 'Something Else',
      icon: '💡',
      description: 'Tell us what you have in mind — we’ll figure it out together.',
    },
  ];

  nextSteps: NextStep[] = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'We hop on a 30-min call within 24–48 hours to understand your goals.',
    },
    {
      step: '02',
      title: 'Proposal & Quote',
      description: 'You receive a tailored proposal, scope and a transparent quote.',
    },
    {
      step: '03',
      title: 'Kickoff & Build',
      description: 'Once approved, we kick off and ship in clear, weekly milestones.',
    },
  ];

  faqs: FaqItem[] = [
    {
      question: 'How fast will I hear back?',
      answer:
        'We respond to every project request within 24–48 hours on business days, usually with a few clarifying questions and next steps.',
    },
    {
      question: 'Do you work with startups & small teams?',
      answer:
        'Absolutely. Most of our clients are early-stage startups, indie founders and product teams who need senior design without enterprise overhead.',
    },
    {
      question: 'What does the Website Audit include?',
      answer:
        'A deep analysis of performance, SEO, accessibility, UX and conversion of your site, delivered as a polished PDF report with a prioritized action plan.',
    },
    {
      question: 'Can you work with my existing developers?',
      answer:
        'Yes — we love collaborating with in-house teams. We deliver pixel-perfect designs, dev-friendly specs and stay involved during implementation.',
    },
  ];

  openFaqIndex: number | null = 0;
  submitted = false;
  submitting = false;
  error = false;

  selectProjectType(type: string) {
    this.formData.projectType = type;
    setTimeout(() => {
      const el = document.getElementById('project-form');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  get isAuditSelected(): boolean {
    return this.formData.projectType === 'Website Audit & Report';
  }

  get descriptionPlaceholder(): string {
    return this.isAuditSelected
      ? 'Tell us about your site, audience and what you’d like the audit to focus on (performance, SEO, UX, conversion, etc.)'
      : 'Describe your project goals, target audience, key features and anything else we should know.';
  }

  onSubmit() {
    if (this.submitting) return;
    this.submitting = true;
    this.error = false;

    this.http
      .post('https://formspree.io/f/xpwzgkby', {
        _subject: `New Project Request: ${this.formData.projectType || 'Unspecified'} — ${this.formData.name}`,
        name: this.formData.name,
        email: this.formData.email,
        company: this.formData.company,
        websiteUrl: this.formData.websiteUrl,
        projectType: this.formData.projectType,
        description: this.formData.description,
        referenceLinks: this.formData.referenceLinks,
      })
      .subscribe({
        next: () => {
          this.submitted = true;
          this.submitting = false;
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
      websiteUrl: '',
      projectType: '',
      description: '',
      referenceLinks: '',
    };
  }
}
