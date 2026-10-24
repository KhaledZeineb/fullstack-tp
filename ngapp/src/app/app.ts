
import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Header } from './header/header';
import { Location } from '@angular/common';
import { Child } from './child/child';
import { Products } from './products/products';
import { ContactForm } from './contact-form/contact-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Child, Products, ContactForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  chosen = '';

  onSelected(state: string) {
    this.chosen = state;
  }

  content = 'Content from Parent';
  states = ['Tozeur', 'Tunis', 'Nabeul'];

  addState(state: string) {
    const value = state.trim();

    if (value && !this.states.includes(value)) {
      this.states = [...this.states, value];
    }
  }

  constructor(
    private router: Router,
    private location: Location
  ) {}

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  gotoContact() {
    this.router.navigate(['/contact']);
  }

  goBack() {
    this.location.back();
  }
}
