export interface IExperience {
  id: number;
  role: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string; // or 'Present'
  description: string;
  technologies?: string[];
  logo?: string;
}
