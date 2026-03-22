import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    company: '',
    budget: '',
    message: '',
  };

  budgetOptions = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
  ];

  submitted = false;

  onSubmit() {
    // Integrate with Formspree or your backend
    console.log('Form submitted:', this.formData);
    this.submitted = true;
    setTimeout(() => this.submitted = false, 5000);
  }
}
