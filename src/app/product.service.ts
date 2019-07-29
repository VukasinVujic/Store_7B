import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./product";
import { HttpClient } from "@angular/common/http";
// import { prodcuts } from "../assets/prodcuts.json"

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  private productUrl = "../assets/products.json";
}
