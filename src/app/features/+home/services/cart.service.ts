import { ICategory } from './../models/category.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.interface';
import { ProductSearchParam } from '../models/product-search-param.interface';

@Injectable()
export class CartService {

    constructor(private http: HttpClient) { }

    public addToCart(product: IProduct) {
      const products = localStorage.getItem(product.id);

      const productsArray: IProduct[] = products ? JSON.parse(products) : [];
      productsArray.push(product);
      localStorage.setItem(product.id, JSON.stringify(productsArray));

      const keys = localStorage.getItem('keys');

      const array: Set<string> = new Set(keys ? JSON.parse(keys) : []);
      array.add(product.id);
      localStorage.setItem('keys', JSON.stringify(Array.from(array)));

    }

    public deleteAllFromCart(productId: string) {
      localStorage.removeItem(productId);

      const keys = localStorage.getItem('keys');

      let array: string[] = JSON.parse(keys);
      array = array.filter(k => k !== productId);
      localStorage.setItem('keys', JSON.stringify(array));
    }

    public deleteFromCart(productId: string) {
      const products = JSON.parse(localStorage.getItem(productId))  ;

      if (products) {
        if (products.length === 1) {
          localStorage.removeItem(productId);

          const keys = localStorage.getItem('keys');

          let array: string[] = JSON.parse(keys);
          array = array.filter(k => k !== productId);
          localStorage.setItem('keys', JSON.stringify(array));

        } else {
          const productsArray: IProduct[] = products;
          productsArray.pop();

          localStorage.setItem(productId, JSON.stringify(productsArray));
        }
      }
    }

    public hasProduct(productId: string) {
      return !!localStorage.getItem(productId);
    }

    public isCartEmpty() {
      const keys = localStorage.getItem('keys');

      return !keys ? true : !JSON.parse(keys).length;
    }

    public clearCart() {
      const keys = JSON.parse(localStorage.getItem('keys'));

      for(let key of keys) {
        localStorage.removeItem(key);
      }

      localStorage.removeItem('keys');
    }

    public getProductsFromCart() {
      const keys: string[] = JSON.parse(localStorage.getItem('keys'));

      const products: IProduct[][] = [];

      if (keys) {
        for (const key of keys) {
          products.push(JSON.parse(localStorage.getItem(key)));
        }
      }

      return products;
    }
}
