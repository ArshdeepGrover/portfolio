import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { SanityService, BlogPostDetail } from '../../services/sanity.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  post: BlogPostDetail | null = null;
  loading = true;
  error: string | null = null;
  markdownHtml: SafeHtml = '';

  constructor(
    private route: ActivatedRoute,
    private sanityService: SanityService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadPost(slug);
      }
    });
  }

  loadPost(slug: string): void {
    this.loading = true;
    this.sanityService.getPostBySlug(slug).subscribe({
      next: (post) => {
        this.post = post;
        // Convert markdown to HTML if markdown content exists
        if (post.markdown) {
          const html = marked(post.markdown);
          this.markdownHtml = this.sanitizer.sanitize(1, html) || '';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blog post';
        this.loading = false;
        console.error('Error loading post:', err);
      },
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
