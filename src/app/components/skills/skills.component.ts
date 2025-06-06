import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  skillCategories = [
    {
      name: 'Frontend',
      skills: [
        { name: 'HTML/CSS', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Angular', level: 90 },
        { name: 'React', level: 80 },
        { name: 'Vue.js', level: 75 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'SASS/SCSS', level: 80 }
      ]
    },
    {
      name: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'Django', level: 70 },
        { name: 'PHP', level: 65 },
        { name: 'Java', level: 60 }
      ]
    },
    {
      name: 'Database',
      skills: [
        { name: 'MongoDB', level: 85 },
        { name: 'MySQL', level: 80 },
        { name: 'PostgreSQL', level: 75 },
        { name: 'Firebase', level: 85 }
      ]
    },
    {
      name: 'Tools & Others',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 75 },
        { name: 'AWS', level: 70 },
        { name: 'CI/CD', level: 75 },
        { name: 'Figma', level: 80 },
        { name: 'Adobe XD', level: 75 }
      ]
    }
  ];

  ngAfterViewInit() {
    // Animation will be handled by CSS transitions
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