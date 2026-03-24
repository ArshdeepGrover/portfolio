export interface ILink {
  id: number;
  title: string;
  url: string;
  icon: string;
  brandColor: string;
  category: 'social' | 'professional' | 'content' | 'other';
  description: string;
  show: boolean;
}
