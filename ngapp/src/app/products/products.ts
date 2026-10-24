
import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../product';
import { Product } from '../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');
  total = signal(0);
  limit = 12;
  skip = signal(0);

  constructor() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set('');

    this.productService.getProducts(this.limit, this.skip()).subscribe({
      next: (response) => {
        this.products.set(response.products);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Impossible de charger les produits. Veuillez réessayer.');
        this.loading.set(false);
      }
    });
  }

  nextPage(): void {
    if (this.skip() + this.limit < this.total()) {
      this.skip.update(value => value + this.limit);
      this.loadProducts();
    }
  }

  previousPage(): void {
    if (this.skip() > 0) {
      this.skip.update(value => value - this.limit);
      this.loadProducts();
    }
  }
}
