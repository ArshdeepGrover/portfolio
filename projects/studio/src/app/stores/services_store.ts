import { IService } from '@models/service.model';

export const services: IService[] = [
  {
    id: 5,
    title: 'Website Audit & Report',
    description: 'Get a deep, data-driven analysis of your website performance, SEO, accessibility, design and conversion. We deliver a beautifully formatted report with prioritized, actionable fixes you can ship today.',
    icon: '📊',
    features: [
      'Performance & Core Web Vitals',
      'SEO & Metadata Audit',
      'Accessibility (WCAG) Check',
      'UX & Conversion Review',
      'Detailed PDF Report',
      'Prioritized Action Plan',
    ],
    badge: 'New',
    featured: true,
  },
  {
    id: 1,
    title: 'Web Design',
    description: 'We craft beautiful, responsive websites that captivate your audience and drive conversions. From landing pages to full-scale web applications.',
    icon: '🌐',
    features: ['Responsive Design', 'SEO Optimized', 'Performance Focused', 'Modern UI/UX'],
  },
  {
    id: 2,
    title: 'Product Design',
    description: 'End-to-end product design from ideation to launch. We create intuitive digital products that users love and businesses rely on.',
    icon: '📱',
    features: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
  },
  {
    id: 3,
    title: 'UI/UX Design',
    description: 'User-centered design that balances aesthetics with functionality. We create seamless experiences that keep users engaged.',
    icon: '🎨',
    features: ['User Flows', 'Design Systems', 'Interaction Design', 'Accessibility'],
  },
  {
    id: 4,
    title: 'Brand Identity',
    description: 'Build a memorable brand from the ground up. We design logos, color systems, and visual guidelines that tell your story.',
    icon: '✨',
    features: ['Logo Design', 'Color Palette', 'Typography', 'Brand Guidelines'],
  },
];
