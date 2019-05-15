import { IAuthResponse } from './../../../core/auth/models/auth-response.interface';
import { AuthHttpService } from './../../../core/auth/services/auth-http.service';
import { Auth } from './../../../core/models/auth.enum';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  public authType = Auth.Log;

  public Auth = Auth;

  public authForm: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor( public dialogRef: MatDialogRef<AuthorizationComponent>,
    public authHttpService: AuthHttpService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.authType = data.authType;
    }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

  public onSubmit() {
    if (this.authForm.valid) {
      let obs: Observable<IAuthResponse>;

      if (this.authType === Auth.Log) {
        obs = this.authHttpService.authorize(this.authForm.value).pipe(
          catchError((err, obser) => {
            this.authForm.setErrors({ 'invalidData': true });

            throw new Error();
          })
        );
      } else {
        obs = this.authHttpService.register(this.authForm.value).pipe(
          switchMap(() => this.authHttpService.authorize(this.authForm.value)),
          catchError((err, obser) => {
            this.authForm.setErrors({ 'userConflict': true });

            throw new Error();
          })
        );
      }

      obs.subscribe(res => this.dialogRef.close(res.token));
    } else {
      this.authForm.setErrors({ 'emptyFields': true });
    }
  }
}
