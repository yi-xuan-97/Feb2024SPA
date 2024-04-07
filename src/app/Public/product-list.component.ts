import { Component, OnInit } from '@angular/core';
import { Product } from '../Shared/Models/Product';
import { ProductService } from '../Core/Services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  constructor(private productService: ProductService) {}

  productsList: Product[] = [];

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe((data) => (this.productsList = data));
  }
}
