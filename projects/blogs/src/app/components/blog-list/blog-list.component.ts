import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IBlog } from '../../models/blog.model';
import { blogs as staticBlogs } from '../../stores/blogs_store';
import { BlogCardComponent } from '../blog-card/blog-card.component';
import { RouterModule } from '@angular/router';
import { SanityService } from '../../services/sanity.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BlogCardComponent, RouterModule],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  private sanityService = inject(SanityService);

  allBlogs: IBlog[] = [];
  filteredBlogs: IBlog[] = [];
  searchQuery: string = '';
  selectedTag: string = 'All';
  allTags: string[] = ['All'];

  ngOnInit(): void {
    this.sanityService.getBlogs().subscribe({
      next: (sanityBlogs) => {
        // Merge and sort by date descending
        this.allBlogs = [...sanityBlogs, ...staticBlogs].sort((a: IBlog, b: IBlog) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.filteredBlogs = this.allBlogs;
        this.extractTags();
      },
      error: () => {
        this.allBlogs = staticBlogs.slice().sort((a: IBlog, b: IBlog) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        this.filteredBlogs = this.allBlogs;
        this.extractTags();
      }
    });
    window.scrollTo(0, 0);
  }

  extractTags(): void {
    const tagsSet = new Set<string>();
    this.allBlogs.forEach(blog => {
      blog.tags.forEach(tag => tagsSet.add(tag));
    });
    this.allTags = ['All', ...Array.from(tagsSet).sort()];
  }

  filterBlogs(): void {
    this.filteredBlogs = this.allBlogs.filter((blog: IBlog) => {
      const matchesSearch = blog.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesTag = this.selectedTag === 'All' || blog.tags.includes(this.selectedTag);
      return matchesSearch && matchesTag;
    });
  }

  selectTag(tag: string): void {
    this.selectedTag = tag;
    this.filterBlogs();
  }

  onSearch(): void {
    this.filterBlogs();
  }
}
