import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getPrimarySocialLinks } from '@stores/social_store';
import { ISocialLink } from '@models/social.model';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  socialLinks: ISocialLink[] = getPrimarySocialLinks();
}