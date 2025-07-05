import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  constructor(private sanitizer: DomSanitizer) {}

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  projects = [
    {
      id: 1,
      title: '🚀 Groupix Spinner – A Customizable Web App Loader Component',
      description:
        'Groupix Spinner is a lightweight, zero-dependency spinner (loader) component library designed to improve user experience during loading states in modern web applications. It provides developers with a suite of vibrant, responsive, and highly customizable CSS-based loading animations that can be easily integrated into Web App project.',
      image: '/project-images/groupix-lib.png',
      iframe:
        'https://groupix-spinner.vercel.app/spinner?utm_source=portfolio&utm_medium=profile&utm_campaign=groupix_spinner',
      technologies: [
        'Angular',
        'TypeScript',
        'Animation',
        'Open-Source Development',
        'NPM',
        'Web App',
      ],
      demoLink:
        'https://groupix-spinner.vercel.app/?utm_source=portfolio&utm_medium=profile&utm_campaign=groupix_spinner',
      codeLink: 'https://github.com/ArshdeepGrover/groupix-spinner-library',
    },
    {
      id: 2,
      title:
        '🚀 TextTransformer – A Chrome Extension for Instant Text Case Conversion',
      description:
        'TextTransformer is a Chrome extension built to simplify text case transformations for developers, writers, and productivity enthusiasts. Designed with an intuitive tabbed interface and real-time conversion display, the tool makes it easy to switch between case styles such as camelCase, snake_case, Title Case, and more.',
      image: '/project-images/text-transformation.png',
      technologies: [
        'JavaScript',
        'Chrome Extensions',
        'Text Processing',
        'HTML',
        'CSS',
      ],
      demoLink: 'https://github.com/ArshdeepGrover/TextTransformer-Chrome',
      codeLink: 'https://github.com/ArshdeepGrover/TextTransformer-Chrome',
    },
    {
      id: 3,
      title: 'CineScope – Discover and Explore Movies Instantly',
      description:
        'CineScope is a modern, responsive movie search and discovery web application that enables users to quickly explore detailed movie information with speed and style. Designed for both casual movie lovers and tech-savvy users, CineScope delivers a smooth, app-like experience that makes finding the right film fast and enjoyable. Powered by the OMDb API',
      image: '/project-images/cine-scope.png',
      technologies: [
        'Angular',
        'Tailwind CSS',
        'OMDb API ',
        'TypeScript',
        'Vercel',
        'Movie Search',
      ],
      demoLink: 'https://cinescope-lyart.vercel.app/Movies',
      codeLink: 'https://github.com/ArshdeepGrover/movies-details',
    },
  ];
}
