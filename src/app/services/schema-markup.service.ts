import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class SchemaMarkupService {
  constructor(@Inject(DOCUMENT) private document: any) {}

  setSchema(schema: Record<string, any>, className = 'structured-data') {
    let script = this.document.createElement('script');
    script.setAttribute('class', className);
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}
