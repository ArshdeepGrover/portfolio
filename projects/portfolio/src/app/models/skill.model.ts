export interface ISkill {
  name: string;
  description: string;
  /**
   * Either a logo URL or a single emoji. Skills that describe a practice
   * rather than a product have no logo, so they use an emoji instead.
   */
  icon?: string;
  category:
    | 'languages'
    | 'frameworks'
    | 'practice'
    | 'tools'
    | 'training'
    | 'other';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ISkillCategory {
  name: string;
  description: string;
  icon: string;
  skills: ISkill[];
}

export interface IOtherTechnology {
  name: string;
  icon: string;
}
