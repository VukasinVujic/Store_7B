import { Component, OnInit } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "../product.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  _superCoolSubject;
  products = [];
  private _onDestroy$ = new Subject<void>();

  constructor(private productService: ProductService) {
    this.products = this.productService.cartList;
    this._superCoolSubject = productService.cartList$
      // .pipe(takeUntil(this._onDestroy$))
      .subscribe(value => {
        let { products = [] } = { ...value };
        this.products = products;
      });
  }

  removeProduct(item: number) {
    this.productService.removeItem(item);
  }

  removeAll() {
    this.productService.removeAll();
  }

  clearFromCart() {
    this.productService.clearCartFromMoney();
    alert("YOU BOUGHT IT YEEEEAH VUUUUUU, no money back B***h");
  }

  ngOnInit() {
    //   this.getProducts;
  }

  // getProducts() {
  //   return this.products;
  // }
  ngOnDestroy() {
    // Prevent memory leak when component destroyed
    // this._onDestroy$.next();
    // this._onDestroy$.complete();
  }
}
