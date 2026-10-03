import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { skillCategories, otherTechnologies } from '@stores/skills_store';
import { ISkillCategory, ISkill, IOtherTechnology } from '@models/skill.model';
import { TiltDirective } from '../../directives/tilt.directive';

interface IDisplaySkill extends ISkill {
  categoryName: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TiltDirective],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent {
  skillCategories: ISkillCategory[] = skillCategories;
  otherTechnologies: IOtherTechnology[] = otherTechnologies;

  activeCategory = 'All';

  private allSkills: IDisplaySkill[] = this.skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, categoryName: cat.name }))
  );

  get categoryTabs(): { name: string; icon: string; count: number }[] {
    return [
      { name: 'All', icon: '✨', count: this.allSkills.length },
      ...this.skillCategories.map((cat) => ({
        name: cat.name,
        icon: cat.icon,
        count: cat.skills.length,
      })),
    ];
  }

  get filteredSkills(): IDisplaySkill[] {
    if (this.activeCategory === 'All') {
      return this.allSkills;
    }
    return this.allSkills.filter(
      (skill) => skill.categoryName === this.activeCategory
    );
  }

  selectCategory(name: string) {
    this.activeCategory = name;
  }

  /**
   * Skills that describe a practice rather than a product have no logo and
   * carry an emoji in `icon` instead, so the template renders text for them.
   */
  isLogo(icon?: string): boolean {
    return !!icon && icon.startsWith('http');
  }

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

  getProficiencyWidth(proficiency: string): number {
    switch (proficiency) {
      case 'expert':
        return 100;
      case 'advanced':
        return 80;
      case 'intermediate':
        return 55;
      case 'beginner':
        return 30;
      default:
        return 30;
    }
  }
}
