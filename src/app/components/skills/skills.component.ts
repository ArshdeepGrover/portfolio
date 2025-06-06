import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Angular', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'SASS/SCSS', level: 80 },
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Ruby On Rails', level: 80 },
        { name: 'Node.js', level: 50 },
      ]
    },
    {
      name: 'Database',
      skills: [
        { name: 'MySQL', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'MongoDB', level: 78 }
      ]
    },
    {
      name: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'AWS', level: 70 },
        { name: 'Figma', level: 80 }
      ]
    }
  ];

  otherSkills = ['Vercel', 'Firebase', 'Redux', 'Material UI', 'Nebular', 'Flowbite']

  ngOnInit() {
    // Initialize component
  }

  ngAfterViewInit() {
    // Animation will be handled by CSS transitions instead of GSAP
    setTimeout(() => {
      const bars = document.querySelectorAll('.skill-progress-bar');
      bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width) {
          (bar as HTMLElement).style.width = width + '%';
        }
      });
    }, 500);
  }
}