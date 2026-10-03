import { IExperience } from '@models/experience.model';

/**
 * Single source of truth for work history. Ordered newest first.
 * The About section groups these by company; the chat fallback reads them flat.
 */
export const experiences: IExperience[] = [
  {
    id: 1,
    role: 'Training Delivery Specialist',
    company: 'Google Operations Center',
    location: 'Gurugram',
    startDate: '2026-08-01',
    endDate: null,
    description:
      'Deliver technical programmes to development and QA teams, and build the material that goes with them.',
    highlights: [
      'Facilitate hands-on learning sessions and workshops on the tools and workflows teams use day to day',
      'Design and maintain training material: walkthroughs, exercises and reference guides',
      'Turn technical concepts into practical, step-by-step learning that teams can apply straight away',
      'Assess how effective each session is and refine the content based on learner feedback',
    ],
    technologies: [
      'Training Delivery',
      'Workshop Facilitation',
      'Training Material Development',
      'HTML/CSS',
      'Email Marketing',
    ],
  },
  {
    id: 2,
    role: 'Lead Software Developer',
    company: 'Commudle',
    location: 'New Delhi',
    startDate: '2024-05-01',
    endDate: '2026-07-31',
    highlights: [
      'Built the hackathon platform end to end: registration, team management, admin panel, sponsor rounds, mentor slot booking and scoring, from zero to production',
      'Integrated Razorpay e-mandate for recurring subscription payments, live in production',
      'Optimised database schema and query performance as the platform grew',
      'Set up CI/CD pipelines with GitHub Actions',
      'Introduced the team to AI coding agents, including documentation and configuration',
      'Ran sprint planning, code reviews and mentoring for the development team',
    ],
    technologies: ['Angular', 'Ruby on Rails', 'Razorpay', 'GitHub Actions'],
  },
  {
    id: 3,
    role: 'Software Developer',
    company: 'Commudle',
    location: 'New Delhi',
    startDate: '2022-08-01',
    endDate: '2024-04-30',
    highlights: [
      "Built Angular applications serving the platform's user base; cut frontend load times by 20%",
      'Integrated Google Tag Manager, removing redeployments from the analytics workflow',
    ],
    technologies: ['Angular', 'TypeScript', 'Google Tag Manager'],
  },
  {
    id: 4,
    role: 'Software Developer, Intern',
    company: 'Commudle',
    location: 'New Delhi',
    startDate: '2022-05-01',
    endDate: '2022-07-31',
    highlights: [
      'Built responsive Angular interfaces for 10,000+ monthly users',
      'Integrated Sanity.io as a headless CMS, cutting content update time by 30%',
    ],
    technologies: ['Angular', 'Sanity'],
  },
  {
    id: 5,
    role: 'Technical Support Executive',
    company: 'Netplus Broadband',
    location: 'Ludhiana',
    startDate: '2020-12-01',
    endDate: '2022-04-30',
    highlights: [
      'Handled 50+ tickets a day, led a team of four technicians, improved resolution time by around 25%',
    ],
  },
  {
    id: 6,
    role: 'Teaching Assistant',
    company: 'Coding Ninjas',
    location: 'New Delhi',
    startDate: '2020-04-01',
    endDate: '2020-08-31',
    highlights: [
      'Supported 50+ students through Node.js and frontend debugging',
    ],
  },
];
