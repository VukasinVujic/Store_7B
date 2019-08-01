import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "../product.service";
import { Subject } from "rxjs";
import { Product } from "../product";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  cartPrice: number = 0;
  _subscription;

  constructor(private productService: ProductService) {
    this._subscription = productService._cartCounter$.subscribe(value => {
      let { price = 0 } = { ...value };
      this.cartPrice = price;
    });
  }

  ngOnInit() {}
}
