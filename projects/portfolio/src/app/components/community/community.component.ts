import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { communityEntries, ICommunityEntry } from '@stores/community_store';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent {
  volunteering: ICommunityEntry[] = communityEntries
    .filter((e) => e.type === 'volunteering')
    .sort((a, b) => b.id - a.id);

  speaking: ICommunityEntry[] = communityEntries
    .filter((e) => e.type === 'speaking')
    .sort((a, b) => b.id - a.id);
}
