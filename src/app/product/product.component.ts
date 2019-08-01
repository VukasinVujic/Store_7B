import { Component, OnInit } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  constructor(private ProductService: ProductService) {}

  products: Product[];

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.ProductService.getProducts().subscribe(
      products => (this.products = products)
    );
  }
}
