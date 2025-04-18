import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemaMarkupService } from 'src/app/services/schema-markup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private schemaMarkupService: SchemaMarkupService
  ) {}

  ngOnInit(): void {
    this.checkFragment();
    this.schema();
  }

  checkFragment() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.scrollAuto(fragment);
      }
    });
  }

  scrollAuto(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element)
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
  }

  schema() {
    this.schemaMarkupService.setSchema({
      '@context': 'https://schema.org/',
      '@type': 'Person',
      name: 'Arshdeep Singh',
      url: 'https://arshdeep-singh.vercel.app/',
      image:
        'https://arshdeep-singh.vercel.app/assets/images/ArshdeepSingh.png',
      sameAs: [
        'https://www.linkedin.com/in/arshdeepgrover/',
        'https://github.com/ArshdeepGrover',
        'https://arshdeep-singh.vercel.app/',
      ],
      jobTitle: 'Software Developer Engineer',
      worksFor: {
        '@type': 'Organization',
        name: 'Commudle',
      },
    });
  }
}
