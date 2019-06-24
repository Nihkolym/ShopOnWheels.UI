import { OrderService } from './../../services/order.service';
import { IProduct } from './../../models/product.interface';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/core/settings';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public orderForm: FormGroup = new FormGroup({
    frequency: new FormControl(''),
    orderDeliver: new FormControl('', [Validators.required]),
  });

  public products: IProduct[][] = [];

  public get totalSum() {
    let sum = 0;

    this.products.forEach(product => {
      sum += product.length * product[0].price;
    });

    return sum;
  }

  constructor(public cartService: CartService, public orderService: OrderService) { }

  ngOnInit() {
    this.products = this.cartService.getProductsFromCart();
  }

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }

  public remove(product: IProduct) {
    this.cartService.deleteFromCart(product.id);
    this.products = this.cartService.getProductsFromCart();
  }

  public removeAll(product: IProduct) {
    this.cartService.deleteAllFromCart(product.id);
    this.products = this.cartService.getProductsFromCart();
  }

  public add(product: IProduct) {
    this.cartService.addToCart(product);
    this.products = this.cartService.getProductsFromCart();
  }

  public send() {
    if (this.orderForm.valid) {
      this.orderService.createOrder({
        total: this.totalSum,
        ...this.orderForm.value,
        orderDate: new Date(Date.now()),
        products: this.products.reduce((product, acc) => [...acc, ...product])
      }).subscribe(() => {
        this.cartService.clearCart();
        this.products = this.cartService.getProductsFromCart();
      });
    } else {
      this.orderForm.setErrors({ 'invalid': true });
    }

  }
}
