import { CartService } from './features/+home/services/cart.service';
import { Router } from '@angular/router';
import { IAuthResponse } from './core/auth/models/auth-response.interface';
import { AuthService } from './core/auth/services/auth.service';
import { Auth } from './core/models/auth.enum';
import { Component } from '@angular/core';

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

  constructor(private authService: AuthService, private router: Router, public cartService: CartService) {}

  public openAuthDialog(authType: Auth) {
    this.authService.openAuthDialog(authType).subscribe(() => {
      this.openHome();
    });
  }

  public openHome() {
    this.router.navigate(['home', 'categories']);
  }

  public logout(){
    this.authService.logOut();
  }

  public openCart() {
    this.router.navigate(['cart']);
  }
}
