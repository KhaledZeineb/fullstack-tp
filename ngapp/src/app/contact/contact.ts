
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactForm } from '../contact-form/contact-form';

@Component({
  selector: 'app-contact',
  imports: [ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  id: string | null = null;
  ref: string | null = null;

  private route = inject(ActivatedRoute);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.route.queryParamMap.subscribe((params) => {
      this.ref = params.get('ref');
    });
  }
}
