import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SanityService } from '../../services/sanity.service';
import { AosService } from '../../services/aos.service';
import { ThemeService } from '@shared/services/theme.service';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { IBlog, ICategory, ISeries } from '../../models/blog.model';

export interface CategoryInfo {
  category: ICategory;
  count: number;
}

export interface SeriesInfo {
  series: ISeries;
  count: number;
  totalParts: number;
}

export interface TagInfo {
  name: string;
  count: number;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BlogCardComponent],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  private sanity = inject(SanityService);
  private aosService = inject(AosService);
  private themeService = inject(ThemeService);

  allBlogs: IBlog[] = [];
  filteredBlogs: IBlog[] = [];
  searchQuery = '';
  selectedTag = 'All';
  selectedSeries = 'All';
  selectedCat = 'All';

  allTags: string[] = ['All'];
  allSeries: string[] = ['All'];
  allCats: string[] = ['All'];
  loading = true;

  // Rich metadata
  categoryInfos: CategoryInfo[] = [];
  seriesInfos: SeriesInfo[] = [];
  tagInfos: TagInfo[] = [];
  uniqueTagCount = 0;
  uniqueSeriesCount = 0;
  uniqueCatCount = 0;

  get isDark() {
    return this.themeService.isDarkMode();
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.sanity.getBlogs().subscribe({
      next: (blogs) => {
        this.allBlogs = blogs;
        this.filteredBlogs = blogs;
        this.extractMeta();
        this.loading = false;
        setTimeout(() => this.aosService.refresh(), 100);
      },
      error: () => { this.loading = false; },
    });
  }

  extractMeta(): void {
    const tags = new Set<string>();
    const series = new Set<string>();
    const cats = new Set<string>();

    // Maps for rich data
    const catMap = new Map<string, { category: ICategory; count: number }>();
    const seriesMap = new Map<string, { series: ISeries; count: number; maxPart: number }>();
    const tagMap = new Map<string, number>();

    this.allBlogs.forEach(b => {
      b.tags?.forEach(t => {
        tags.add(t.name);
        tagMap.set(t.name, (tagMap.get(t.name) || 0) + 1);
      });
      if (b.series?.name) {
        series.add(b.series.name);
        const existing = seriesMap.get(b.series.name);
        if (existing) {
          existing.count++;
          if (b.seriesPart && b.seriesPart > existing.maxPart) existing.maxPart = b.seriesPart;
        } else {
          seriesMap.set(b.series.name, { series: b.series, count: 1, maxPart: b.seriesPart || 1 });
        }
      }
      if (b.category?.name) {
        cats.add(b.category.name);
        const existing = catMap.get(b.category.name);
        if (existing) {
          existing.count++;
        } else {
          catMap.set(b.category.name, { category: b.category, count: 1 });
        }
      }
    });

    this.allTags = ['All', ...Array.from(tags).sort()];
    this.allSeries = ['All', ...Array.from(series)];
    this.allCats = ['All', ...Array.from(cats)];

    this.categoryInfos = Array.from(catMap.values())
      .sort((a, b) => b.count - a.count);
    this.seriesInfos = Array.from(seriesMap.values())
      .map(s => ({ series: s.series, count: s.count, totalParts: s.maxPart }))
      .sort((a, b) => b.count - a.count);
    this.tagInfos = Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    this.uniqueTagCount = tags.size;
    this.uniqueSeriesCount = series.size;
    this.uniqueCatCount = cats.size;
  }

  filterBlogs(): void {
    const q = this.searchQuery.toLowerCase();
    this.filteredBlogs = this.allBlogs.filter(b => {
      const matchSearch = !q
        || b.title.toLowerCase().includes(q)
        || b.excerpt?.toLowerCase().includes(q)
        || b.tags?.some(t => t.name.toLowerCase().includes(q));

      const matchTag = this.selectedTag === 'All'
        || b.tags?.some(t => t.name === this.selectedTag);

      const matchSeries = this.selectedSeries === 'All'
        || b.series?.name === this.selectedSeries;

      const matchCat = this.selectedCat === 'All'
        || b.category?.name === this.selectedCat;

      return matchSearch && matchTag && matchSeries && matchCat;
    });
    
    setTimeout(() => this.aosService.refresh(), 50);
  }

  hasActiveFilters(): boolean {
    return this.searchQuery !== '' || 
           this.selectedTag !== 'All' || 
           this.selectedSeries !== 'All' || 
           this.selectedCat !== 'All';
  }

  // TrackBy functions for performance
  trackByIndex(index: number): number {
    return index;
  }

  trackByBlog(index: number, blog: IBlog): string {
    return blog.slug || blog.title;
  }

  trackByCategory(index: number, category: string): string {
    return category;
  }

  trackBySeries(index: number, series: string): string {
    return series;
  }

  selectTag(tag: string): void { this.selectedTag = tag; this.filterBlogs(); }
  selectSeries(s: string): void { this.selectedSeries = s; this.filterBlogs(); }
  selectCat(c: string): void { this.selectedCat = c; this.filterBlogs(); }
  onSearch(): void { this.filterBlogs(); }
  clearSearch(): void { this.searchQuery = ''; this.filterBlogs(); }

  reset(): void {
    this.searchQuery = '';
    this.selectedTag = this.selectedSeries = this.selectedCat = 'All';
    this.filteredBlogs = this.allBlogs;
    setTimeout(() => this.aosService.refresh(), 50);
  }
}
