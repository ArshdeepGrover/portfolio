export interface IExperience {
  id: number;
  role: string;
  company: string;
  location?: string;
  /** ISO date, e.g. '2026-08-01'. */
  startDate: string;
  /** ISO date, or null while the role is current. */
  endDate: string | null;
  /** Prose summary, used for roles described in a single line. */
  description?: string;
  /** Bulleted outcomes, used for roles with several distinct achievements. */
  highlights?: string[];
  technologies?: string[];
  logo?: string;
}
