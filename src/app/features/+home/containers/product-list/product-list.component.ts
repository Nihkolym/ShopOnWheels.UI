import { CartService } from './../../services/cart.service';
import { IProduct } from './../../models/product.interface';
import { ProductService } from './../../services/product.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, tap, filter, map } from 'rxjs/operators';
import { AppSettings } from 'src/app/core/settings';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  public seek = 4;
  public from: number = 0;
  public to: number = this.seek;

  public categoryName = '';

  public products: IProduct[] = [];

  constructor(
    public router: ActivatedRoute,
    public productService: ProductService,
    public cartService: CartService) { }

  ngOnInit() {
    this.router.queryParams.pipe(
        filter(params => params.category === 'all'),
        switchMap((params: any) => {
          return this.productService.search(params);
        }),
      ).subscribe(p => this.products = p);

    this.router.paramMap.pipe(
      filter(params => params.get('categoryId') !== 'all'),
      switchMap((params: any) => {
        return this.productService.search({ categoryId: params.get('categoryId')});
      }),
    ).subscribe(p => this.products = p);
  }

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }

  public left() {
    this.from -= this.seek;
    this.to -= this.seek;
  }

  public right() {
    this.from += this.seek;
    this.to += this.seek;
  }

}
