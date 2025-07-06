import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {
  certificates = [
    {
      id: 1,
      title: 'Angular Developer Certification',
      issuer: 'Google',
      date: 'March 2024',
      description: 'Comprehensive certification covering Angular framework, TypeScript, and modern web development practices.',
      image: '/certificates/angular-cert.png',
      credentialUrl: 'https://example.com/credential/angular'
    },
    {
      id: 2,
      title: 'Full Stack Web Development',
      issuer: 'freeCodeCamp',
      date: 'January 2024',
      description: 'Complete full-stack development certification including frontend and backend technologies.',
      image: '/certificates/fullstack-cert.png',
      credentialUrl: 'https://example.com/credential/fullstack'
    },
    {
      id: 3,
      title: 'Ruby on Rails Certification',
      issuer: 'Ruby Association',
      date: 'December 2023',
      description: 'Professional certification in Ruby on Rails framework and best practices.',
      image: '/certificates/rails-cert.png',
      credentialUrl: 'https://example.com/credential/rails'
    }
  ];
}