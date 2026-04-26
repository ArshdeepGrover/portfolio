import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HERO_STATS } from '@stores/stats_store';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  readonly stats = HERO_STATS;

  get experienceNumber(): string {
    return this.stats.find(s => s.label.toLowerCase().includes('experience'))?.number.replace('~', '') || '4+';
  }
}


