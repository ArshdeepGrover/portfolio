import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SanityService, BlogPost } from '../../services/sanity.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  posts: BlogPost[] = [];
  loading = true;
  error: string | null = null;

  constructor(private sanityService: SanityService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.sanityService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading posts:', err);
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
