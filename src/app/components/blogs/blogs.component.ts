import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  blogs = [
    {
      id: 1,
      title: 'Building Scalable Angular Applications with Best Practices',
      excerpt: 'Learn how to structure and build maintainable Angular applications that can scale with your business needs.',
      image: '/blog-images/angular-best-practices.jpg',
      category: 'Angular',
      date: 'March 15, 2024',
      readTime: 8,
      tags: ['Angular', 'TypeScript', 'Architecture'],
      url: 'https://medium.com/@ArshdeepGrover/angular-best-practices'
    },
    {
      id: 2,
      title: 'Ruby on Rails API Development: A Complete Guide',
      excerpt: 'Comprehensive guide to building robust APIs with Ruby on Rails, including authentication and testing.',
      image: '/blog-images/rails-api-guide.jpg',
      category: 'Ruby on Rails',
      date: 'February 28, 2024',
      readTime: 12,
      tags: ['Ruby on Rails', 'API', 'Backend'],
      url: 'https://medium.com/@ArshdeepGrover/rails-api-guide'
    },
    {
      id: 3,
      title: 'Modern CSS Techniques: From Flexbox to Grid',
      excerpt: 'Explore modern CSS layout techniques and how to create responsive designs with Flexbox and CSS Grid.',
      image: '/blog-images/modern-css.jpg',
      category: 'CSS',
      date: 'February 10, 2024',
      readTime: 6,
      tags: ['CSS', 'Flexbox', 'Grid', 'Responsive'],
      url: 'https://medium.com/@ArshdeepGrover/modern-css-techniques'
    },
    {
      id: 4,
      title: 'JavaScript ES6+ Features Every Developer Should Know',
      excerpt: 'Deep dive into modern JavaScript features that will make your code cleaner and more efficient.',
      image: '/blog-images/javascript-es6.jpg',
      category: 'JavaScript',
      date: 'January 25, 2024',
      readTime: 10,
      tags: ['JavaScript', 'ES6', 'Modern JS'],
      url: 'https://medium.com/@ArshdeepGrover/javascript-es6-features'
    }
  ];
}