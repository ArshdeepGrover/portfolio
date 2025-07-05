import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  description: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  proficiency: 'beginner' | 'intermediate' | 'advanced';
}

interface SkillCategory {
  name: string;
  description: string;
  icon: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements AfterViewInit {
  skillCategories: SkillCategory[] = [
    {
      name: 'Frontend Development',
      description:
        'Modern web technologies and frameworks for creating responsive user interfaces',
      icon: '🎨',
      skills: [
        {
          name: 'Angular',
          description:
            'Full-stack applications, component architecture, RxJS, Angular Material',
          icon: '⚡',
          category: 'frontend',
          proficiency: 'intermediate',
        },
        {
          name: 'TypeScript',
          description:
            'Type-safe development, interfaces, generics, advanced patterns',
          icon: '🔷',
          category: 'frontend',
          proficiency: 'advanced',
        },
        {
          name: 'JavaScript (ES6+)',
          description:
            'Modern JS features, async/await, functional programming',
          icon: '🟨',
          category: 'frontend',
          proficiency: 'advanced',
        },
        {
          name: 'HTML5 & CSS3',
          description: 'Semantic HTML, CSS Grid, Flexbox, responsive design',
          icon: '🌐',
          category: 'frontend',
          proficiency: 'intermediate',
        },
        {
          name: 'Tailwind CSS',
          description:
            'Utility-first CSS, custom configurations, responsive design',
          icon: '🎨',
          category: 'frontend',
          proficiency: 'advanced',
        },
        {
          name: 'SASS/SCSS',
          description: 'CSS preprocessing, mixins, variables, nested rules',
          icon: '💎',
          category: 'frontend',
          proficiency: 'advanced',
        },
      ],
    },
    {
      name: 'Backend Development',
      description:
        'Server-side technologies and APIs for building robust applications',
      icon: '⚙️',
      skills: [
        {
          name: 'Ruby on Rails',
          description:
            'RESTful APIs, MVC architecture, ActiveRecord, RSpec testing',
          icon: '💎',
          category: 'backend',
          proficiency: 'advanced',
        },
        {
          name: 'Node.js',
          description: 'Express.js, REST APIs, middleware, authentication',
          icon: '🟢',
          category: 'backend',
          proficiency: 'beginner',
        },
      ],
    },
    {
      name: 'Database & Cloud',
      description:
        'Data management and cloud infrastructure solutions solutions solutions solutions',
      icon: '🗄️',
      skills: [
        {
          name: 'PostgreSQL',
          description:
            'Database design, complex queries, performance optimization',
          icon: '🐘',
          category: 'database',
          proficiency: 'advanced',
        },
        {
          name: 'MySQL',
          description: 'Database administration, stored procedures, triggers',
          icon: '🐬',
          category: 'database',
          proficiency: 'intermediate',
        },
        {
          name: 'MongoDB',
          description: 'NoSQL database, aggregation pipelines, indexing',
          icon: '🍃',
          category: 'database',
          proficiency: 'intermediate',
        },
        {
          name: 'AWS',
          description: 'EC2, S3, RDS, Lambda, CloudFormation',
          icon: '☁️',
          category: 'database',
          proficiency: 'intermediate',
        },
        {
          name: 'Firebase',
          description: 'Authentication, Firestore, hosting, real-time database',
          icon: '🔥',
          category: 'database',
          proficiency: 'intermediate',
        },
      ],
    },
    {
      name: 'Tools & DevOps',
      description:
        'Development tools, version control, and deployment practices',
      icon: '🛠️',
      skills: [
        {
          name: 'Git & GitHub',
          description: 'Version control, branching strategies, code reviews',
          icon: '📚',
          category: 'tools',
          proficiency: 'advanced',
        },
      ],
    },
  ];

  otherTechnologies = [
    { name: 'Bootstrap', icon: '🎨' },
    { name: 'Material UI', icon: '🎨' },
    { name: 'Figma', icon: '🎨' },
    { name: 'REST APIs', icon: '🔗' },
    { name: 'JWT', icon: '🔐' },
    { name: 'OAuth', icon: '🔐' },
  ];

  selectedSkill: Skill | null = null;

  getProficiencyColor(proficiency: string): string {
    switch (proficiency) {
      case 'expert':
        return 'text-green-600 dark:text-green-400';
      case 'advanced':
        return 'text-blue-600 dark:text-blue-400';
      case 'intermediate':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'beginner':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  getProficiencyBadge(proficiency: string): string {
    switch (proficiency) {
      case 'expert':
        return 'Expert';
      case 'advanced':
        return 'Advanced';
      case 'intermediate':
        return 'Intermediate';
      case 'beginner':
        return 'Beginner';
      default:
        return 'Beginner';
    }
  }

  selectSkill(skill: Skill) {
    this.selectedSkill = skill;
  }

  closeSkillDetails() {
    this.selectedSkill = null;
  }

  ngAfterViewInit() {
    // Animation will be handled by CSS transitions
  }
}
