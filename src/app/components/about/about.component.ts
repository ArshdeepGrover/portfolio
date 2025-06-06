import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  experiences = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2021 - Present',
      description: 'Led the development of multiple web applications using Angular and React. Implemented responsive designs and optimized performance.'
    },
    {
      title: 'Web Developer',
      company: 'Digital Creations',
      period: '2018 - 2021',
      description: 'Developed and maintained client websites. Collaborated with designers to implement UI/UX improvements.'
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Innovations',
      period: '2016 - 2018',
      description: 'Assisted in the development of web applications. Learned and implemented modern frontend technologies.'
    }
  ];

  education = [
    {
      degree: 'Master of Computer Science',
      institution: 'University of Technology',
      year: '2016',
      description: 'Specialized in Web Technologies and Software Engineering'
    },
    {
      degree: 'Bachelor of Computer Science',
      institution: 'State University',
      year: '2014',
      description: 'Focused on Programming and Database Management'
    }
  ];
}