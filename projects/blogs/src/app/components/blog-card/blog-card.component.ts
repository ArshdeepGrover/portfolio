import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IBlog } from '@models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() blog!: IBlog;
  @Input() index: number = 0;
}
