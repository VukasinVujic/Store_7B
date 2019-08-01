import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  product: Product = {
    id: 0,
    name: " ",
    picture: " ",
    description: " ",
    price: 5,
    tags: []
  };
  // @Input() product: Product; //just take input from Product class that you made and imported above

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(id).subscribe(product => {
      this.product = product;
    });
  }

  addToCart() {
    this.productService.addToCart(this.product);
  }
}
