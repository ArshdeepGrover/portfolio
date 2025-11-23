import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBlog } from '@models/blog.model';
import { blogs } from '@stores/blogs_store';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent {
  blogs: IBlog[] = blogs.slice().sort((a, b) => b.id - a.id);

  openBlog(url: string): void {
    window.open(url, '_blank');
  }
}
