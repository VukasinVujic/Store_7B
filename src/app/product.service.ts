import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { Product } from "./product";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { filter, switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProduct(id: number): Observable<Product> {
    return this.getProducts().pipe(
      switchMap(products => of(products.filter(p => p.id === id)[0]))
    );
  }

  private productUrl = "../assets/products.json";
  sumOfValue: number[] = [];
  sumOfArray: number = 0;
  cartList = [];

  _cartCounter$: Subject<object> = new Subject<object>();
  _cartList$: Subject<object> = new Subject<object>();

  get cartList$() {
    return this._cartList$.asObservable();
  }

  addToCart(product: Product): void {
    // from details.ts addToCart
    this.sumOfValue.push(product.price);
    this.sumOfArray = this.sumOfValue.reduce((a, b) => {
      return a + b;
    });
    this.cartList.push(product);

    this._cartCounter$.next({
      price: this.sumOfArray
    });
    this._cartList$.next({
      products: this.cartList
    });
  }

  removeItem(forRemoving): void {
    if (this.cartList.find(x => x.id === forRemoving)) {
      let index = this.cartList.findIndex(obj => {
        return obj.id === forRemoving;
      });
      this.cartList.splice(index, 1);
    }

    this._cartList$.next({
      products: this.cartList
    });
  }

  removeAll(): void {
    this.cartList = [];
    this._cartList$.next({
      products: this.cartList
    });
  }

  clearCartFromMoney(): void {
    this.sumOfArray = 0;
    this.removeAll();
    this.sumOfValue = [];

    this._cartCounter$.next({
      price: 0
    });
  }
}
