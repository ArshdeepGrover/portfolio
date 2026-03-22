export interface IProject {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  category?: 'web' | 'product' | 'branding';
  technologies: string[];
  image?: string;
  iframe?: string;
  url?: string;
  githubUrl?: string;
  tags?: string[];
  demoLink?: string;
  liveUrl?: string;

  // Studio-specific fields
  challenge?: string;
  solution?: string;
  results?: string[];

  // Visibility flags
  showInPortfolio: boolean;
  showInStudio: boolean;
}
