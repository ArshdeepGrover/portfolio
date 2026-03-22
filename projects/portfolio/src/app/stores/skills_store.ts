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
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
        category: 'frontend',
        proficiency: 'intermediate',
      },
      {
        name: 'TypeScript',
        description:
          'Type-safe development, interfaces, generics, advanced patterns',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        category: 'frontend',
        proficiency: 'advanced',
      },
      {
        name: 'JavaScript (ES6+)',
        description: 'Modern JS features, async/await, functional programming',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        category: 'frontend',
        proficiency: 'advanced',
      },
      {
        name: 'HTML5 & CSS3',
        description: 'Semantic HTML, CSS Grid, Flexbox, responsive design',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        category: 'frontend',
        proficiency: 'intermediate',
      },
      {
        name: 'Tailwind CSS',
        description:
          'Utility-first CSS, custom configurations, responsive design',
        icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg',
        category: 'frontend',
        proficiency: 'advanced',
      },
      {
        name: 'SASS/SCSS',
        description: 'CSS preprocessing, mixins, variables, nested rules',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
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
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
        category: 'backend',
        proficiency: 'advanced',
      },
      {
        name: 'Node.js',
        description: 'Express.js, REST APIs, middleware, authentication',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        category: 'backend',
        proficiency: 'beginner',
      },
    ],
  },
  {
    name: 'Database & Cloud',
    description: 'Data management and cloud infrastructure solutions',
    icon: '🗄️',
    skills: [
      {
        name: 'PostgreSQL',
        description:
          'Database design, complex queries, performance optimization',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        category: 'database',
        proficiency: 'intermediate',
      },
      {
        name: 'MySQL',
        description: 'Database administration, stored procedures, triggers',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        category: 'database',
        proficiency: 'intermediate',
      },
      {
        name: 'MongoDB',
        description: 'NoSQL database, aggregation pipelines, indexing',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        category: 'database',
        proficiency: 'beginner',
      },
      {
        name: 'RDBMS',
        description: 'Relational database concepts, normalization, indexing',
        icon: 'https://www.vectorlogo.zone/logos/sqlite/sqlite-icon.svg',
        category: 'database',
        proficiency: 'intermediate',
      },
      {
        name: 'AWS',
        description: 'EC2, S3, RDS, Lambda, CloudFormation',
        icon: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',
        category: 'database',
        proficiency: 'beginner',
      },
      {
        name: 'Firebase',
        description: 'Authentication, Firestore, hosting, real-time database',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
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
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        category: 'tools',
        proficiency: 'advanced',
      },
      {
        name: 'GitLab',
        description: 'CI/CD pipelines, merge requests, project management',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg',
        category: 'tools',
        proficiency: 'intermediate',
      },
      {
        name: 'Postman',
        description: 'API testing, collections, automation, documentation',
        icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg',
        category: 'tools',
        proficiency: 'advanced',
      },
      {
        name: 'Ubuntu',
        description: 'Linux administration, command line, server management',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg',
        category: 'tools',
        proficiency: 'intermediate',
      },
    ],
  },
  {
    name: 'Analytics & Marketing',
    description: 'Web analytics, tracking, and digital marketing tools',
    icon: '📊',
    skills: [
      {
        name: 'Google Analytics',
        description: 'Web analytics, conversion tracking, audience insights',
        icon: 'https://www.vectorlogo.zone/logos/google_analytics/google_analytics-icon.svg',
        category: 'analytics',
        proficiency: 'intermediate',
      },
      {
        name: 'Google Tag Manager',
        description: 'Tag management, event tracking, conversion setup',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        category: 'analytics',
        proficiency: 'intermediate',
      },
      {
        name: 'Schema.org',
        description: 'Structured data, SEO optimization, rich snippets',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg',
        category: 'analytics',
        proficiency: 'intermediate',
      },
      {
        name: 'Sentry',
        description: 'Error tracking, performance monitoring, debugging',
        icon: 'https://www.vectorlogo.zone/logos/sentryio/sentryio-icon.svg',
        category: 'analytics',
        proficiency: 'intermediate',
      },
    ],
  },
];

export const otherTechnologies: IOtherTechnology[] = [
  {
    name: 'Material UI',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
  },
  {
    name: 'Nebular',
    icon: 'https://akveo.github.io/nebular/assets/img/akveo-logo.png',
  },
  {
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'JWT',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'Markdown',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg',
  },
  {
    name: 'Sanity CMS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sanity/sanity-original.svg',
  },
  {
    name: 'Vercel',
    icon: 'https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg',
  },
  {
    name: 'NPM',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',
  },
];
