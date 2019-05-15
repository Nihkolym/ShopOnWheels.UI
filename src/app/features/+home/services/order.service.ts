import { IOrder } from './../models/order.interface';
import { ICategory } from './../models/category.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {

    constructor(private http: HttpClient) { }

    public createOrder(order: IOrder): Observable<IOrder> {
      return this.http.post<IOrder>(`${AppSettings.apiHost}/Order`, order);
    }
}
