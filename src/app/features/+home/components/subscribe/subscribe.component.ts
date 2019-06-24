import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {

  public orderForm: FormGroup = new FormGroup({
    frequency: new FormControl('', [Validators.required, Validators.min(1)]),
    orderDeliver: new FormControl('', [Validators.required]),
  });

  constructor(public dialogRef: MatDialogRef<SubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.orderForm.patchValue(data);
    }

  ngOnInit() {
  }

  public submit() {
    if (this.orderForm.valid) {
      this.dialogRef.close({
        ...this.orderForm.value,
      });
    }
  }

}
