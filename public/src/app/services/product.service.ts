import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

import { Product } from '../Shared/Product';
import { ProductSearchQuery } from '../Shared/ProductSearchQuery';
import { ProductServiceConfig } from '../Shared/ProductServiceConfig';
import { ProductServiceStatsConfig } from '../Shared/ProductServiceStatsConfig';
import { Data } from '../Shared/Data';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  // getConfig() {
  //   const url = `http://localhost:3000/api/product/config`;

  //   return this.http.get(url)
  //     .map(
  //     (response: Response) => {
  //       const res = response.json();
  //       // console.log('res = ', res);
  //       return new ProductServiceConfig(
  //         res.soldBarrierStatusRangeConfig,
  //         res.maxEditDistanceConfig,
  //         res.maxFuzzyConfig
  //       );
  //     });
  // }

  // getStatsConfig(field: String) {
  //   const url = `http://localhost:3000/api/product/statsconfig/${field}`;

  //   return this.http.get(url)
  //     .map(
  //     (response: Response) => {
  //       const res = response.json();
  //       // console.log('res = ', res);
  //       return new ProductServiceStatsConfig(
  //         res
  //       );
  //     });
  // }

  checkServerStatus() {
    const url = `http://localhost:3000/api/monitoring/_healthcheck`;

    return this.http.get(url)
      .map(
      (response: Response) => {
        const res = response.json();
        // console.log('res = ', res);
        // return new ProductServiceStatsConfig(
        //   res
        // );
        return res;
      });
  }

  search(query: any) {
    const url = `http://localhost:3000/api/covid/search`;
    // console.log('getQuotes', url);
    return this.http.post(url, { query })
      .map(
      (response: Response) => {
        // console.log(response.json());

        return response.json().map(item => {
          const itemSrc = item._source;

          return new Data(
            itemSrc.countryRegion,
            itemSrc.provinceState,
            itemSrc.active,
            itemSrc.confirmed,
            itemSrc.recovered,
            itemSrc.deaths,
            itemSrc.lastUpdate
          );
        });
      });
  }

}
