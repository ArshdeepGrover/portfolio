export interface ILink {
  id: number;
  title: string;
  url: string;
  icon: string;
  iconType?: 'image' | 'svg'; // New field to specify icon type
  brandColor: string;
  category: 'social' | 'professional' | 'content' | 'other' | 'packages';
  description: string;
  show: boolean;
}
