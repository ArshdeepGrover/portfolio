export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
}

export interface SanityBlock {
  _type: 'block' | 'image' | 'code';
  _key: string;
  style?: string;
  children?: Array<{ _type: 'span'; _key: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _type: string; _key: string; href?: string }>;
  // code block
  language?: string;
  code?: string;
  filename?: string;
  // image block
  asset?: { _ref: string };
  alt?: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: string;
  image?: SanityImage;
  bio?: string;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  color?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author?: Author;
  coverImage?: SanityImage;
  publishedAt: string;
  updatedAt?: string;
  excerpt: string;
  categories?: Category[];
  body?: SanityBlock[];
  readTime?: number;
  featured?: boolean;
}
