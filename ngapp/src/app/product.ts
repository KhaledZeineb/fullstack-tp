
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { environment } from '../environments/environment';

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(limit = 12, skip = 0): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(
      `${environment.apiUrl}/products?limit=${limit}&skip=${skip}`
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${environment.apiUrl}/products/${id}`
    );
  }
}
