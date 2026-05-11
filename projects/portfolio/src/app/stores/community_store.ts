export interface ICommunityEntry {
  id: number;
  role: string;
  event: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  type: 'volunteering' | 'speaking';
  highlight?: string;
}

export const communityEntries: ICommunityEntry[] = [
  {
    id: 1,
    role: 'Speaker',
    event: '"Get Started with AI" Workshop',
    organizer: 'Meerut Coders',
    date: 'Aug 2025',
    location: 'Online',
    description: 'Delivered a free online webinar introducing AI concepts and practical tools to developers in the Meerut Coders community.',
    type: 'speaking',
  },
  {
    id: 2,
    role: 'Mentor',
    event: 'HackFest',
    organizer: 'GDG Cloud New Delhi (in partnership with Agora)',
    date: 'Nov 2025',
    location: 'Online',
    description: 'Mentored teams at a 24-hour online hackathon, guiding participants on architecture, tech stack choices, and product thinking.',
    type: 'volunteering',
  },
  {
    id: 3,
    role: 'Mentor',
    event: 'HackNagpur 2.0',
    organizer: 'GDG Nagpur',
    date: 'Jan 2026',
    location: 'Nagpur',
    description: 'Mentored at the 24-hour Adaptive Systems Challenge hackathon, helping teams tackle complex problem statements with scalable solutions.',
    type: 'volunteering',
  },
  {
    id: 4,
    role: 'Judge',
    event: 'The Dev Arena, Feature Enhancement Challenge',
    organizer: 'GDG × CULMYCA, JC Bose UST',
    date: 'Apr 2026',
    location: 'Faridabad',
    description: 'Evaluated projects at a HackerEarth-powered competition with a ₹17K+ prize pool, assessing technical depth, innovation, and presentation.',
    type: 'volunteering',
    highlight: '₹17K+ prize pool',
  },
  {
    id: 5,
    role: 'Mentor',
    event: 'Code Nakshatra 2.0',
    organizer: 'Code Rangers, TIIPS',
    date: 'May 2026',
    location: 'Greater Noida',
    description: 'Guided 200+ participants through a 24-hour hackathon at TIIPS, Greater Noida, providing technical mentorship and product feedback.',
    type: 'volunteering',
    highlight: '200+ participants',
  },
];
