import { IStudioProject } from '@models/studio-project.model';

/**
 * Studio-only showcase of work. This store is independent from the shared
 * portfolio store so studio projects can be curated separately.
 * Add / edit entries here to control what appears on the Studio portfolio section.
 */
export const studioProjects: IStudioProject[] = [
  {
    id: 1,
    title: 'Active Rehab Clinic — Brand & Digital Identity',
    shortDescription:
      'End-to-end brand and digital identity for a physiotherapy clinic in Dwarka, Delhi — built from scratch.',
    description:
      'Built the Active Rehab Clinic identity from the ground up: naming direction, logo, visual system, templates, and a complete digital presence. Shipped a patient-first marketing site covering musculoskeletal, neurological and sports rehabilitation, plus a dedicated Home Visit funnel for elderly and post-surgery patients — all unified under one consistent brand language.',
    category: 'branding',
    technologies: [
      'Brand Strategy',
      'Logo Design',
      'Brand Guidelines',
      'Templates',
      'Angular',
      'Tailwind CSS',
      'SEO',
      'Responsive',
    ],
    image:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.activerehabclinic.com?w=1200&h=800',
    mobileImage:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.activerehabclinic.com?w=420&h=900&vpw=420&vph=900',
    gallery: [
      '/assets/projects/arc/arc-desktop.webp',
      '/assets/projects/arc/arc-mobile.webp',
    ],
    mockup: '/assets/projects/arc/arc-desktop.webp',
    demoLink: 'https://www.activerehabclinic.com',
    client: 'Active Rehab Clinic',
    year: '2025',
    role: 'Brand Identity + Design & Build',
    challenge:
      'The clinic was starting fresh and needed a complete identity — name expression, logo, visual system and a digital presence that could establish trust, communicate specialised services and drive appointment bookings (including a brand-new Home Visit service for Delhi NCR).',
    solution:
      'Designed a cohesive brand from scratch — logo, color system, typography, templates and tone of voice — then applied it across a conversion-oriented marketing site with a clear service taxonomy, testimonials, a Home Visit promotion block, and a streamlined booking CTA flowing to a dedicated appointment page.',
    results: [
      'Full brand identity built from zero',
      '500+ patients reached online',
      'Dedicated Home Visit funnel for Delhi NCR',
      'Unified brand system across print + digital',
    ],
    show: true,
  },
  {
    id: 2,
    title: 'Staff Ease — Staff Management SaaS',
    shortDescription:
      'Multi-site staff management PWA with attendance, shifts, salary and analytics.',
    description:
      'An end-to-end staff management product for households, property managers and facility companies — covering multi-organisation and multi-site setups, shift management, role-based access, attendance, salary automation and analytics. Ships as an installable PWA with offline support.',
    category: 'product',
    technologies: [
      'Angular',
      'TypeScript',
      'Tailwind CSS',
      'PWA',
      'JWT Auth',
      'Role-Based Access',
    ],
    image:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.staffease.in?w=1200&h=800',
    mobileImage:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.staffease.in?w=420&h=900&vpw=420&vph=900',
    gallery: [
      '/assets/projects/staff-ease/staffease-laptop.webp',
      '/assets/projects/staff-ease/staff-ease-desktop.webp',
      '/assets/projects/staff-ease/staffease-mobile.webp',
    ],
    mockup: '/assets/projects/staff-ease/staff-ease-desktop.webp',
    demoLink: 'https://www.staffease.in',
    client: 'Staff Ease',
    year: '2025',
    role: 'Product Design & Full-Stack',
    challenge:
      'Existing spreadsheets and ad-hoc tools couldn’t scale for property managers running staff across many sites, with complex shifts, advances and role permissions.',
    solution:
      'Designed and shipped a multi-tenant PWA with guided onboarding, custom shifts, attendance tracking, automated salary calculations, audit logs and device session management.',
    results: [
      'Unlimited sites & organisations per account',
      'Offline-ready PWA with auto-sync',
      'Role-based access with audit logging',
    ],
    show: true,
  },
  {
    id: 3,
    title: 'The Electronics Bond — Enterprise AV Website',
    shortDescription:
      'B2B marketing site for an AV and electronics solutions provider across hospitality, corporate and government sectors.',
    description:
      'A polished corporate site for a technology and AV solutions provider serving hospitality, corporate and government clients. Communicates expertise across digital signage, AV setups, consumer electronics and corporate gifting, while showcasing trusted brand partners and enterprise patronage.',
    category: 'web',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'SEO'],
    image:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.theelectronicsbond.com?w=1200&h=800',
    mobileImage:
      'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.theelectronicsbond.com?w=420&h=900&vpw=420&vph=900',
    gallery: [
      '/assets/projects/teb/teb-laptop.webp',
      '/assets/projects/teb/teb-desktop.webp',
      '/assets/projects/teb/teb-mobile.webp',
    ],
    mockup: '/assets/projects/teb/teb-desktop.webp',
    demoLink: 'https://www.theelectronicsbond.com/',
    client: 'The Electronics Bond',
    year: '2025',
    role: 'Design & Build',
    challenge:
      'The team needed a credible B2B presence that could speak to decision-makers across very different verticals — from hotel chains and hospitals to universities and government bodies.',
    solution:
      'Structured the narrative around four clear service pillars, added a dedicated Trusted Partners and Patronage section, and wired a single “Talk to Our Team” CTA through every section.',
    results: [
      'Unified B2B positioning across 4 verticals',
      'Clear partner & patronage showcase',
      'Single high-intent contact funnel',
    ],
    show: true,
  },
];

export const visibleStudioProjects: IStudioProject[] = studioProjects.filter(
  (p) => p.show !== false
);
