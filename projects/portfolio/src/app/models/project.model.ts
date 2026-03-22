export interface IProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  iframe?: string;
  url?: string;
  githubUrl?: string;
  tags?: string[];
  demoLink: string;
}
