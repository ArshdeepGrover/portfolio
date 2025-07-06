export interface ISkill {
  name: string;
  description: string;
  icon?: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'other';
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
