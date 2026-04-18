export interface IService {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
  badge?: string;
  featured?: boolean;
}
