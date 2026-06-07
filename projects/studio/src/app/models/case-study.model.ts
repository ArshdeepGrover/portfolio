export interface IMetric {
  label: string;
  value: string;
  icon?:  string;
}

export interface ICaseStudy {
  id:                  string;
  title:               string;
  slug:                string;
  status:              'published' | 'draft';
  featured:            boolean;
  clientName?:         string;
  clientRole?:         string;
  clientCompany?:      string;
  industry?:           string;
  duration?:           string;
  liveUrl?:            string;
  services:            string[];
  techStack:           string[];
  coverImage?:         string;
  gallery?:            string[];
  summary?:            string;
  challenge?:          string;
  solution?:           string;
  results?:            IMetric[];
  testimonialQuote?:   string;
  testimonialAuthor?:  string;
  publishedAt?:        string;
}
