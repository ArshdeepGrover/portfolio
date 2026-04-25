import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IBlog } from '@models/blog.model';
import { blogs as staticBlogs } from '@stores/blogs_store';
import { SanityService } from '../../services/sanity.service';
import { marked } from 'marked';
import { toHTML } from '@portabletext/to-html';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private sanityService = inject(SanityService);
  
  blog: IBlog | undefined;
  renderedContent: SafeHtml | undefined;
  suggestedBlogs: IBlog[] = [];

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      
      // Try to fetch from Sanity first, fallback to static store
      this.sanityService.getBlogById(id).subscribe({
        next: (sanityBlog) => {
          if (sanityBlog) {
            this.blog = sanityBlog;
            this.processContent();
            this.loadSuggestedBlogs();
          } else {
            this.loadFromStaticStore(id);
          }
        },
        error: () => this.loadFromStaticStore(id)
      });

      window.scrollTo(0, 0);
    });
  }

  private loadFromStaticStore(id: string | number): void {
    this.blog = staticBlogs.find((b: IBlog) => String(b.id) === String(id));
    if (!this.blog) {
      this.router.navigate(['/blogs']);
      return;
    }
    this.processContent();
    this.loadSuggestedBlogs();
  }

  private processContent(): void {
    if (!this.blog?.content) return;

    let html: string;
    if (typeof this.blog.content === 'string') {
      // It's Markdown
      html = marked.parse(this.blog.content) as string;
    } else {
      // It's Sanity Portable Text
      html = toHTML(this.blog.content);
    }
    
    this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(html);
  }

  loadSuggestedBlogs(): void {
    // For now, still using static blogs for suggestions, 
    // but in a real setup, we would fetch from Sanity too.
    this.suggestedBlogs = staticBlogs
      .filter((b: IBlog) => b.id !== this.blog?.id)
      .slice(0, 3);
  }

  openExternal(): void {
    if (this.blog?.url) {
      window.open(this.blog.url, '_blank');
    }
  }
}
