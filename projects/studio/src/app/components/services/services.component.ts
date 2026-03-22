import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { services } from '@stores/services_store';
import { IService } from '@models/service.model';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  services: IService[] = services;
}
