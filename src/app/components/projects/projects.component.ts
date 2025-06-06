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
      image: 'assets/images/project1.jpg',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, task assignments, and progress tracking.',
      image: 'assets/images/project2.jpg',
      technologies: ['React', 'Firebase', 'Tailwind CSS', 'Redux'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Portfolio Website',
      description: 'A responsive portfolio website with modern animations, dark mode, and contact form integration.',
      image: 'assets/images/project3.jpg',
      technologies: ['Angular', 'Tailwind CSS', 'GSAP', 'AOS'],
      demoLink: '#',
      codeLink: '#',
      featured: true
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      description: 'A weather application that displays current and forecasted weather data for any location.',
      image: 'assets/images/project4.jpg',
      technologies: ['JavaScript', 'HTML/CSS', 'Weather API', 'Chart.js'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      id: 5,
      title: 'Blog Platform',
      description: 'A content management system for creating and managing blog posts with user authentication.',
      image: 'assets/images/project5.jpg',
      technologies: ['Vue.js', 'Node.js', 'MySQL', 'Express'],
      demoLink: '#',
      codeLink: '#',
      featured: false
    },
    {
      id: 6,
      title: 'Fitness Tracker',
      description: 'A mobile-responsive application for tracking workouts, nutrition, and fitness progress.',
      image: 'assets/images/project6.jpg',
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