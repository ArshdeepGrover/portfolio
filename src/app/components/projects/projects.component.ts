import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A full-featured online shopping platform with payment integration, user authentication, and admin dashboard.',
      image: 'https://via.placeholder.com/600x400/FF7955/FFFFFF?text=E-Commerce+Platform',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, task assignments, and progress tracking.',
      image: 'https://via.placeholder.com/600x400/FF7955/FFFFFF?text=Task+Management+App',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with modern animations, dark mode, and contact form integration.',
      image: 'https://via.placeholder.com/600x400/FF7955/FFFFFF?text=Portfolio+Website',
      technologies: ['Angular', 'Tailwind CSS', 'AOS', 'TypeScript'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A weather application that displays current and forecasted weather data for any location.',
      image: 'https://via.placeholder.com/600x400/FF7955/FFFFFF?text=Weather+Dashboard',
      technologies: ['JavaScript', 'HTML/CSS', 'Weather API', 'Chart.js'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'A content management system for creating and managing blog posts with user authentication.',
      image: 'https://via.placeholder.com/600x400/FF7955/FFFFFF?text=Blog+Platform',
      technologies: ['Vue.js', 'Node.js', 'MySQL', 'Express'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      description: 'A mobile-responsive application for tracking workouts, nutrition, and fitness progress.',
      image: 'https://via.placeholder.com/600x400/FF7955/FFFFFF?text=Fitness+Tracker',
      technologies: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    }
  ];

  categories = ['All', 'Web App', 'Mobile App', 'UI/UX', 'Other'];
  selectedCategory = 'All';

  filterProjects(category: string) {
    this.selectedCategory = category;
    // In a real application, you would filter projects based on category
  }
}