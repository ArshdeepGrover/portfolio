import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Category, Post } from '@models/post.model';
import { MOCK_POSTS } from '../../services/mock-posts';
import { environment } from '../../../environments/environment';
import { SanityService } from '@services/sanity.service';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="tags-page">
      <div class="container">
        <h1 class="page-title">Browse by <span class="accent">Tag</span></h1>
        <p class="page-sub">Filter articles by topic</p>

        <div class="tags-grid">
          <a class="tag-card" *ngFor="let cat of categories"
             [routerLink]="['/']" [queryParams]="{category: cat.slug}"
             [style.--tag-color]="cat.color">
            <span class="tag-title">{{ cat.title }}</span>
            <span class="tag-count">{{ getCount(cat.slug) }} post{{ getCount(cat.slug) !== 1 ? 's' : '' }}</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tags-page { padding: 7rem 1.5rem 5rem; }
    .container { max-width: 900px; margin: 0 auto; }
    .page-title { font-size: 2.5rem; font-weight: 900; color: #fff; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
    .accent { color: #ff7955; }
    .page-sub { color: rgba(255,255,255,0.35); margin-bottom: 3rem; }
    .tags-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 1rem; }
    .tag-card {
      --tag-color: #ff7955;
      display: flex; flex-direction: column; gap: 0.4rem;
      padding: 1.25rem 1.5rem; border-radius: 14px;
      background: color-mix(in srgb, var(--tag-color) 8%, rgba(255,255,255,0.02));
      border: 1px solid color-mix(in srgb, var(--tag-color) 25%, transparent);
      text-decoration: none; transition: all 0.25s;
      &:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); background: color-mix(in srgb, var(--tag-color) 14%, rgba(255,255,255,0.03)); }
    }
    .tag-title { font-size: 1rem; font-weight: 700; color: #fff; }
    .tag-count { font-size: 0.78rem; color: rgba(255,255,255,0.4); }
  `],
})
export class TagsComponent implements OnInit {
  categories: Category[] = [];
  posts: Post[] = [];

  constructor(private sanity: SanityService) {}

  ngOnInit() {
    const isMock = environment.sanityProjectId === 'YOUR_PROJECT_ID';
    if (isMock) {
      this.posts = MOCK_POSTS;
      const catMap = new Map<string, Category>();
      MOCK_POSTS.forEach((p) => p.categories?.forEach((c) => catMap.set(c._id, c)));
      this.categories = Array.from(catMap.values());
    } else {
      this.sanity.getCategories().subscribe((c) => (this.categories = c));
      this.sanity.getPosts().subscribe((p) => (this.posts = p));
    }
  }

  getCount(slug: string): number {
    return this.posts.filter((p) => p.categories?.some((c) => c.slug === slug)).length;
  }
}
