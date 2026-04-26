import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { services } from '@stores/services_store';
import { CONTACT_INFO } from '@stores/contact_store';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  readonly services = services;
  readonly contact = CONTACT_INFO;
}

