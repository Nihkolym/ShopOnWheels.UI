import { CartComponent } from './../containers/cart/cart.component';
import { ProductListComponent } from './../containers/product-list/product-list.component';
import { HttpGuard } from './../../../core/guards/http.guard';
import { CategoriesComponent } from './../containers/categories/categories.component';
import { Route } from '@angular/router';
import { HomeComponent } from '../containers/home/home.component';
import { OrdersComponent } from '../containers/orders/orders.component';

export const routes: Route[] = [
    {
        path: 'home',
        component: HomeComponent,
        children: [
          {
            path: 'categories',
            component: CategoriesComponent,
          },
          {
            path: 'categories/:categoryId',
            component: ProductListComponent,
          }
        ],
        canActivate: [HttpGuard]
    },
    {
      path: 'orders',
      component: OrdersComponent,
    },
    {
      path: 'cart',
      component: CartComponent,
    }
];
