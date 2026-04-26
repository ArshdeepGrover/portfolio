import { Injectable, Inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(metaTags: { name?: string; property?: string; content: string }[]) {
    metaTags.forEach(tag => {
      if (tag.name) {
        this.metaService.updateTag({ name: tag.name, content: tag.content });
      } else if (tag.property) {
        this.metaService.updateTag({ property: tag.property, content: tag.content });
      }
    });

    // Automatically sync some property tags to name tags for broader compatibility (Twitter/OG)
    metaTags.forEach(tag => {
      if (tag.property === 'og:title') this.metaService.updateTag({ name: 'twitter:title', content: tag.content });
      if (tag.property === 'og:description') this.metaService.updateTag({ name: 'twitter:description', content: tag.content });
      if (tag.property === 'og:image') this.metaService.updateTag({ name: 'twitter:image', content: tag.content });
    });
  }

  updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  setJsonLd(data: any, id: string = 'schema-data') {
    let script = this.document.getElementById(id) as HTMLScriptElement;
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    script.text = JSON.stringify(data);
  }

}
