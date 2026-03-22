export interface IPortfolioProject {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  category: 'web' | 'product' | 'branding';
  image: string;
  technologies: string[];
  liveUrl?: string;
  challenge: string;
  solution: string;
  results: string[];
}
