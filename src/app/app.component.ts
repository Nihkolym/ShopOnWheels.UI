import { CartService } from './features/+home/services/cart.service';
import { Router } from '@angular/router';
import { IAuthResponse } from './core/auth/models/auth-response.interface';
import { AuthService } from './core/auth/services/auth.service';
import { Auth } from './core/models/auth.enum';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './core/auth/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShopOnWheels';

  public Auth = Auth;

  public get isCartEmpty() {
    return this.cartService.isCartEmpty();
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    public cartService: CartService,
    private translate: TranslateService,
    private settings: StorageService,
  ) {
    translate.setDefaultLang(this.settings.local || 'en');
  }

  public changeLoc(loc: string){
    this.settings.local = loc;
    this.translate.use(loc);
  }

  public openAuthDialog(authType: Auth) {
    this.authService.openAuthDialog(authType).subscribe(() => {
      this.openHome();
    });
  }

  public openHome() {
    this.router.navigate(['home', 'categories']);
  }

  public openOrdersScreen() {
    this.router.navigate(['orders']);
  }

  public logout(){
    this.authService.logOut();
  }

  public openCart() {
    this.router.navigate(['cart']);
  }
}
