import { IProcessStep } from '@models/process-step.model';

export const processSteps: IProcessStep[] = [
  {
    id: 1,
    title: 'Discovery',
    description: 'We dive deep into your business, audience, and goals. Through research and strategy sessions, we define the project scope and success metrics.',
    icon: '🔍',
    step: 1,
  },
  {
    id: 2,
    title: 'Design',
    description: 'From wireframes to high-fidelity mockups, we craft every pixel with purpose. Iterative feedback ensures the design aligns with your vision.',
    icon: '🎨',
    step: 2,
  },
  {
    id: 3,
    title: 'Develop',
    description: 'We bring designs to life with clean, performant code. Responsive, accessible, and built with modern technologies for scalability.',
    icon: '⚡',
    step: 3,
  },
  {
    id: 4,
    title: 'Launch',
    description: 'Rigorous testing, optimization, and a smooth deployment. We ensure everything is pixel-perfect before going live, and provide ongoing support.',
    icon: '🚀',
    step: 4,
  },
];
