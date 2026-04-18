export type StudioProjectCategory = 'web' | 'product' | 'branding';

export interface IStudioProject {
  id: number;
  title: string;
  description: string;
  shortDescription?: string;
  category: StudioProjectCategory;
  technologies: string[];

  image?: string;
  /** Optional mobile-viewport screenshot; used inside the phone mockup. */
  mobileImage?: string;
  /**
   * Optional pre-framed mockup / screenshot images (e.g. exported from
   * Shotbot, Mockuuups Studio, Figma, etc). When provided, these are rendered
   * in a gallery on the detail page instead of the CSS device mockups.
   */
  gallery?: string[];
  iframe?: string;
  mockup?: string;

  /** Public live link for the project. */
  demoLink?: string;
  /** Optional public source repository. */
  githubUrl?: string;

  // Studio case-study fields
  client?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
  results?: string[];

  /** Toggle visibility without removing the entry. */
  show?: boolean;
}
