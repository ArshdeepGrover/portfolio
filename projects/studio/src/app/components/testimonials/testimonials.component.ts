import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { testimonials } from '@stores/testimonials_store';
import { ITestimonial } from '@models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonials: ITestimonial[] = testimonials;

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}
