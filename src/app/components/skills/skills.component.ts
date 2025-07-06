import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skillCategories, otherTechnologies } from '@stores/skills_store';
import { ISkillCategory, IOtherTechnology } from '@models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skillCategories: ISkillCategory[] = skillCategories;
  otherTechnologies: IOtherTechnology[] = otherTechnologies;

  getProficiencyColor(proficiency: string): string {
    switch (proficiency) {
      case 'expert':
        return 'text-green-600 dark:text-green-400';
      case 'advanced':
        return 'text-blue-600 dark:text-blue-400';
      case 'intermediate':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'beginner':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  }

  getProficiencyBadge(proficiency: string): string {
    switch (proficiency) {
      case 'expert':
        return 'Expert';
      case 'advanced':
        return 'Advanced';
      case 'intermediate':
        return 'Intermediate';
      case 'beginner':
        return 'Beginner';
      default:
        return 'Beginner';
    }
  }
}
