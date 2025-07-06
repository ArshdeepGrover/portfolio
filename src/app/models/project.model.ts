export interface IProject {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  image?: string;
  url?: string;
  githubUrl?: string;
  tags?: string[];
  date?: string;
}
