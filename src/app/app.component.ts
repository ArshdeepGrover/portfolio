import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SchemaMarkupService } from 'src/app/service/schema-markup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
   
    private schemaMarkupService: SchemaMarkupService
  ) {}

  ngOnInit(): void {
    this.schema();
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
