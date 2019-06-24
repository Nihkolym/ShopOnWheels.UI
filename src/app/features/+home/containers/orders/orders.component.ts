import { BoxesComponent } from './../../components/boxes/boxes.component';
import { OrderService } from './../../services/order.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IOrder } from '../../models/order.interface';
import { AppSettings } from 'src/app/core/settings';
import { MatDialog } from '@angular/material';
import { SubscribeComponent } from '../../components/subscribe/subscribe.component';
import { filter, switchMap } from 'rxjs/operators';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';



@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  public orders: IOrder[] = [];
  panelOpenState = false;


  constructor(
    private _orderService: OrderService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this._orderService.getOrders().subscribe(orders => this.orders = orders);
  }

  public iconPath(name: string) {
    return `${AppSettings.images}/${name}`;
  }

  public getLogo(order: IOrder) {
    let url = '';
    if (order.frequency) {
      if (order.isActive) {
        // tslint:disable-next-line:max-line-length
        url = 'src/assets/orders/active.png';
      } else {
        // tslint:disable-next-line:max-line-length
        url = 'src/assets/orders/inactive.png'
      }
    } else {
      // tslint:disable-next-line:max-line-length
      url = 'src/assets/orders/default.png'
    }

    return url;
  }

  public showBoxes(order: IOrder) {
    this._dialog.open(BoxesComponent, {
      panelClass: 'subscribe-container',
      data: {id: order.id}
    });
  }

  public subscribe(order: IOrder) {
    this._dialog.open(SubscribeComponent, {
      panelClass: 'subscribe-container',
      data: {
        frequency: order.frequency,
        orderDeliver: order.orderDeliver
      }
    }).afterClosed().pipe(
      filter(value => !!value),
      switchMap(value => {
        return this._orderService.update({
          ...order,
          ...value,
          isActive: true,
          orderDate: new Date(Date.now()),
        });
      })
    ).subscribe(
      res => {
        const index = this.orders.findIndex(o => o.id === res.id);
        this.orders[index] = res;
      }
    );
  }

  public unsubscribe(order: IOrder) {
    return this._orderService.update({
      ...order,
      isActive: false,
    }).subscribe(
      res => {
        const index = this.orders.findIndex(o => o.id === res.id);
        this.orders[index] = res;
      }
    );
  }

}
