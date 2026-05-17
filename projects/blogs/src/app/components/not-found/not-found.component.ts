import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align:center;padding:10rem 1.5rem">
      <p style="font-size:5rem;margin-bottom:1rem">✦</p>
      <h1 style="font-size:2rem;font-weight:900;color:#fff;margin-bottom:0.75rem">Page not found</h1>
      <p style="color:rgba(255,255,255,0.4);margin-bottom:2rem">The post you're looking for doesn't exist.</p>
      <a routerLink="/" style="color:#ff7955;font-weight:700;text-decoration:none">← Back to blog</a>
    </div>
  `,
})
export class NotFoundComponent {}
