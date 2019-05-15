import { AuthorizationComponent } from './../../../features/+authorization/authorization/authorization.component';
import { IAuthResponse } from './../models/auth-response.interface';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { filter, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Auth } from '../../models/auth.enum';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public get isAuthorized() {
    return !!this._storageService.token;
  }

  constructor(
    private _http: HttpClient,
    public router: Router,
    private _storageService: StorageService,
    public dialog: MatDialog
  ) { }

  public openAuthDialog(authType: Auth) {
    const dialog = this.dialog.open(AuthorizationComponent, {
      backdropClass: 'auth-backdrop',
      panelClass: 'auth-panel',
      data: {
        authType
      }
    });

    return dialog.afterClosed().pipe(filter(res => !!res), tap((token: string) => {
      this._storageService.token = token;
    }));
  }

  public logOut() {
    this._storageService.clearCredentials();
    this.router.navigate(['']);
  }

}
