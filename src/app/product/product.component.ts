import { Component, OnInit } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  products: Product[];
  productAAA: Product;

  product: Product = {
    id: 0,
    name: " ",
    picture: " ",
    description: " ",
    price: 5,
    tags: []
  };

  ngOnInit() {
    this.getProducts();
    this.getProduct();
    // console.log(productAAA);
  }

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe(products => (this.products = products));
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  addToCart(product: Product) {
    this.productService.addToCart(product);
  }
}
