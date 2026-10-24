import { ProductDetail } from './product-detail/product-detail';
import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Contact } from './contact/contact';
import { About } from './about/about';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '' },
  { path: 'login', component: Login },
  { path: 'contact', component: Contact },
  { path: 'contact/:id', component: Contact },
  { path: 'about', component: About },
  { path: 'products/:id', component: ProductDetail },
  { path: '**', component: NotFound },
];
