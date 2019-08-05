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

  constructor(private productServis: ProductService) {
    this.products = this.productServis.cartList;
    this._superCoolSubject = productServis.cartList$
      // .pipe(takeUntil(this._onDestroy$))
      .subscribe(value => {
        let { products = [] } = { ...value };
        this.products = products;
      });
  }

  removeProduct(item: number) {
    this.productServis.removeItem(item);
  }

  removeAll() {
    this.productServis.removeAll();
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
