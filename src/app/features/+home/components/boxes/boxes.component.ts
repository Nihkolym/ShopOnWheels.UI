import { BoxService } from './../../services/box.service';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IBox } from '../../models/box.interface';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { AppSettings } from 'src/app/core/settings';
import { IOrder } from '../../models/order.interface';

function toCamelCase(key, value) {
  if (value && typeof value === 'object'){
    for (var k in value) {
      if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
        value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
        delete value[k];
      }
    }
  }
  return value;
}

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.css']
})
export class BoxesComponent implements OnInit, OnDestroy {

  public orderId;

  public boxes: IBox[] = [];

  public orderConnection: HubConnection;


  constructor(public dialogRef: MatDialogRef<BoxesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public boxService: BoxService) {
      this.orderId = data.id;
     }

     public setConnection() {
      const builder = new HubConnectionBuilder();
      this.orderConnection = builder.withUrl(AppSettings.orderHubHost).build();

      this.orderConnection.on('BoxUpdate', (boxesJSON: string) => {
        if (boxesJSON) {
          const boxes: IBox[] = JSON.parse(boxesJSON, toCamelCase);
          this.boxes = boxes.filter(box => box.order.id === this.orderId);
        }
      });

      this.orderConnection.on('AddedBoxes', (boxesJSON: string) => {
        if (boxesJSON) {
          const boxes: IBox[] = JSON.parse(boxesJSON, toCamelCase);
          this.boxes = boxes.filter(box => box.order.id === this.orderId);
        }
      });

      this.orderConnection.on('DataSent', (boxJSON: string) => {
        if (boxJSON) {
          const box: IBox = JSON.parse(boxJSON, toCamelCase);
          this.boxes[this.boxes.findIndex(b => b.id === box.id)] = box;
        }
      });

      this.orderConnection.start();
    }

  ngOnInit() {
    this.boxService.getBoxes(this.orderId).subscribe(boxes => this.boxes = boxes);
    this.setConnection();
  }

  ngOnDestroy() {
    this.orderConnection.stop();
  }

}
