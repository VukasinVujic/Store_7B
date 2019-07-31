import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  valueToShow: number = 100;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getValue();
    console.log(this.productService.getSum());
    console.log("aaaa");
  }

  getValue(): void {
    this.valueToShow += this.productService.sumOfValue;
    console.log(this.productService.getSum());
  }
}
