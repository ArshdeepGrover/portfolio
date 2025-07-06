export interface IBlog {
  id: number;
  title: string;
  summary: string;
  date: string;
  url: string;
  image?: string;
  tags?: string[];
}
