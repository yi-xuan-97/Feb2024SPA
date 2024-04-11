import { Component, OnInit } from '@angular/core';
import { Product } from '../Shared/Models/Product';
import { ProductService } from '../Core/Services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  productsList: Product[] = [];

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((data) => (this.productsList = data));
  }

  onDetailClick(productId: number): void {
    console.log('Product ID:', productId);
    this.router.navigate(['/Product', productId]);
  }

  isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
