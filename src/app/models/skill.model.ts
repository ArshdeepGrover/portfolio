export interface Skill {
  name: string;
  description: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface SkillCategory {
  name: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export interface OtherTechnology {
  name: string;
  icon: string;
}
