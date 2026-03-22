export interface IEducation {
  id: number;
  degree: string;
  field: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate?: string; // or 'Present'
  description?: string;
  logo?: string;
}
