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

  _cartCounter$: Subject<object> = new Subject<object>();

  addToCart(product: Product): void {
    this.sumOfValue.push(product.price);
    this.sumOfArray = this.sumOfValue.reduce((a, b) => {
      return a + b;
    });
    this._cartCounter$.next({
      price: this.sumOfArray
    });
  }
}
