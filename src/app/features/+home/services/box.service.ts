import { Injectable } from '@angular/core';
import { AppSettings } from 'src/app/core/settings';
import { HttpClient } from '@angular/common/http';
import { IBox } from '../models/box.interface';

@Injectable({
  providedIn: 'root'
})
export class BoxService {

  constructor(private http: HttpClient) { }

  public getBoxes(orderId) {
    return this.http.get<IBox[]>(`${AppSettings.apiHost}/Box/orders/${orderId}`);
  }
}
