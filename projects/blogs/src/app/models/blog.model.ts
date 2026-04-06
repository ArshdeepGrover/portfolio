export interface IBlog {
  id: number | string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  tags: string[];
  url: string;
  content?: string | any[];
}
