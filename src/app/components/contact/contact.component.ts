import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  success = false;
  error = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.contactForm.valid) {
      // In a real application, you would send the form data to a backend service
      console.log('Form submitted:', this.contactForm.value);
      
      // Simulate API call
      setTimeout(() => {
        this.success = true;
        this.contactForm.reset();
        this.submitted = false;
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }, 1500);
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 5000);
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}