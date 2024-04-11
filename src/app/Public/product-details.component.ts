import { Component, OnInit } from '@angular/core';
import { Product } from '../Shared/Models/Product';
import { ProductService } from '../Core/Services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productsList: Product[] = [];
  productId: number = 0;
  product: Product = {
    id:          0,
    name:        "",
    description: "",
    price:       0,
    category:    "",
    stock:       0
  };

  constructor(private productService: ProductService,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    this.productService
      .getProductById(this.productId)
      .subscribe((data) => (this.product = data));

  }

  isEmptyObject(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
