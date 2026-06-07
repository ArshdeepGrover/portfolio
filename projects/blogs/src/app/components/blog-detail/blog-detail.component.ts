import { Component, OnInit, OnDestroy, inject, ViewEncapsulation } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { SanityService } from '../../services/sanity.service';
import { AosService } from '../../services/aos.service';
import { IBlog } from '../../models/blog.model';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// Configure marked for better output
marked.setOptions({
  gfm: true,
  breaks: true,
});

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private sanity = inject(SanityService);
  private sanitizer = inject(DomSanitizer);
  private aosService = inject(AosService);
  private scrollListener?: () => void;

  blog: IBlog | null = null;
  renderedContent: SafeHtml | null = null;
  loading = true;
  progress = 0;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    
    this.sanity.getBlogBySlug(slug).subscribe({
      next: (blog) => {
        this.blog = blog;
        if (blog?.markdownContent) {
          const html = marked(blog.markdownContent) as string;
          this.renderedContent = this.sanitizer.bypassSecurityTrustHtml(html);
        }
        this.loading = false;
        setTimeout(() => {
          this.initReadingProgress();
          this.aosService.refresh();
        }, 300);
      },
      error: () => { this.loading = false; },
    });
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  openExternal(): void {
    if (this.blog?.externalUrl) {
      window.open(this.blog.externalUrl, '_blank', 'noopener,noreferrer');
    }
  }

  shareArticle(): void {
    if (!this.blog) return;
    
    const shareData = {
      title: this.blog.title,
      text: this.blog.excerpt || 'Check out this article',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(console.error);
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        // You could show a toast notification here
        console.log('URL copied to clipboard');
      }).catch(console.error);
    }
  }

  private initReadingProgress(): void {
    this.scrollListener = () => {
      const el = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      this.progress = height > 0 ? Math.round((top / height) * 100) : 0;
    };
    
    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }
}
