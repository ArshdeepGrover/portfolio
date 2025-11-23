import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { certificates } from '@stores/certificate_store';
import { ICertificate } from '@models/certificate.model';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent {
  certificates: ICertificate[] = certificates
    .slice()
    .sort((a, b) => b.id - a.id);

  openCertificate(url: string): void {
    window.open(url, '_blank');
  }
}
