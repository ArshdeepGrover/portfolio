import { Component, Input, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@shared/services/theme.service';
import { IBlog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
})
export class BlogCardComponent {
  @Input() blog!: IBlog;
  @Input() index = 0;

  private themeService = inject(ThemeService);

  get isDark() {
    return this.themeService.isDarkMode();
  }

  share(event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    const url = `${window.location.origin}/blog/${this.blog.slug}`;
    const shareData = {
      title: this.blog.title,
      text: this.blog.excerpt || 'Check out this article',
      url,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  }
}
