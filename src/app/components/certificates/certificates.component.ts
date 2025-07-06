import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { certificates } from '@stores/certificate_store';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
  certificates = certificates;
}
