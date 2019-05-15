import { ICategory } from './../models/category.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.interface';
import { ProductSearchParam } from '../models/product-search-param.interface';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    public search(params: ProductSearchParam): Observable<IProduct[]> {
      let p = new HttpParams();

      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          p = p.set(key, params[key]);
        }
      }
      return this.http.get<IProduct[]>(`${AppSettings.apiHost}/Product/search`, {params: p});
    }
}
