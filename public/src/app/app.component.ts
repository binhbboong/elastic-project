import { Component, OnInit } from '@angular/core';

import { ProductService } from './services/product.service';
import { Product } from './Shared/Product';
import { Data } from './Shared/Data';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dataResponse: Data[] = [];

  sliderMinPrice: number;
  sliderMaxPrice: number;
  sliderFromPrice: number;
  sliderToPrice: number;
  wasClicked = false;

  serverHealthResponse: any;
  searchText: String;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.checkServerStatus();

    this.sliderMinPrice = 0;
    this.sliderMaxPrice = 1000;
    this.sliderFromPrice = 0;
    this.sliderToPrice = 1000;

  }

  checkServerStatus() {
    this.productService.checkServerStatus()
      .subscribe(
      (response: Product[]) => {
        console.log('serverHealthResponse =', response);
        this.serverHealthResponse = response;
      },
      (error) => console.log(error)
      );
  }

  search() {
    this.productService.search({countryRegion: this.searchText})
      .subscribe(
      (response: Data[]) => {
        console.log('response =', response);
        this.dataResponse = response;
      },
      (error) => console.log(error)
      );
  }
}
