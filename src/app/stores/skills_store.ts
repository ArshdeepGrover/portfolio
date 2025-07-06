import { ISkillCategory, IOtherTechnology } from '@models/skill.model';

export const skillCategories: ISkillCategory[] = [
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
        description: 'Modern JS features, async/await, functional programming',
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
    description: 'Development tools, version control, and deployment practices',
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

export const otherTechnologies: IOtherTechnology[] = [
  { name: 'Bootstrap', icon: '🎨' },
  { name: 'Material UI', icon: '🎨' },
  { name: 'Figma', icon: '🎨' },
  { name: 'REST APIs', icon: '🔗' },
  { name: 'JWT', icon: '🔐' },
  { name: 'OAuth', icon: '🔐' },
];
