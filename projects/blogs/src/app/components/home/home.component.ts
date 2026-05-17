import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Post, Category } from '@models/post.model';
import { SanityService } from '@services/sanity.service';
import { MOCK_POSTS } from '../../services/mock-posts';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loading = true;
  allPosts: Post[] = [];
  featuredPost: Post | null = null;
  recentPosts: Post[] = [];
  categories: Category[] = [];
  activeCategory = 'all';
  isPlaceholder = false;

  constructor(private sanity: SanityService) {}

  ngOnInit() {
    const isMockMode = environment.sanityProjectId === 'YOUR_PROJECT_ID';
    if (isMockMode) {
      this.loadMockData();
    } else {
      this.loadSanityData();
    }
  }

  private loadMockData() {
    this.isPlaceholder = true;
    this.allPosts = MOCK_POSTS;
    this.processPosts(MOCK_POSTS);
  }

  private loadSanityData() {
    this.sanity.getPosts().subscribe((posts) => {
      this.allPosts = posts;
      this.processPosts(posts);
    });
    this.sanity.getCategories().subscribe((cats) => (this.categories = cats));
  }

  private processPosts(posts: Post[]) {
    this.featuredPost = posts.find((p) => p.featured) ?? posts[0] ?? null;
    this.recentPosts = posts.filter((p) => p._id !== this.featuredPost?._id);
    // derive categories from posts
    const catMap = new Map<string, Category>();
    posts.forEach((p) => p.categories?.forEach((c) => catMap.set(c._id, c)));
    this.categories = Array.from(catMap.values());
    this.loading = false;
  }

  get filteredPosts(): Post[] {
    if (this.activeCategory === 'all') return this.recentPosts;
    return this.recentPosts.filter((p) =>
      p.categories?.some((c) => c.slug === this.activeCategory),
    );
  }

  setCategory(slug: string) {
    this.activeCategory = slug;
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getCoverEmoji(post: Post): string {
    const cat = post.categories?.[0]?.slug ?? '';
    const map: Record<string, string> = {
      angular: '🅰️', 'ruby-on-rails': '💎', payments: '💳',
      analytics: '📊', cms: '🗂️', leadership: '🏆', career: '🚀',
      ai: '🤖', performance: '⚡', packages: '📦',
    };
    return map[cat] ?? '✦';
  }

  imageUrl(ref: string | undefined, w = 800): string {
    if (!ref) return '/images/blog-placeholder.jpg';
    return this.sanity.imageUrl(ref, w);
  }
}
