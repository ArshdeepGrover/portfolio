export interface ITag {
  name: string;
  slug: string;
}

export interface ICategory {
  name:  string;
  slug:  string;
  icon?: string;
  color?: string;
  description?: string;
}

export interface ISeries {
  name:  string;
  slug:  string;
  description?: string;
}

export interface IBlog {
  id:               string;
  title:            string;
  slug:             string;
  excerpt:          string;
  image:            string;
  date:             string;
  readTime:         number;
  tags:             ITag[];
  category?:        ICategory;
  series?:          ISeries;
  seriesPart?:      number;
  markdownContent?: string;
  externalUrl?:     string;
  status?:          'published' | 'draft' | 'archived';
}
