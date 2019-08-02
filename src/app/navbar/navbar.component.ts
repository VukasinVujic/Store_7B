import { Component, OnInit, Input } from "@angular/core";
import { ProductService } from "../product.service";

import { Subject } from "rxjs";
import { Product } from "../product";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { counter } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  cartPrice: number = 0;
  _subscription;
  faShoppingCart = faShoppingCart;

  constructor(private productService: ProductService) {
    this._subscription = productService._cartCounter$.subscribe(value => {
      let { price = 0 } = { ...value };
      this.cartPrice = price;
    });
  }

  ngOnInit() {}
}
