
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [FormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  name = '';
  email = '';

  onSubmit() {
    console.log('Nom :', this.name);
    console.log('Email :', this.email);
  }
}
