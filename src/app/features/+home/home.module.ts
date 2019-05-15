import { CategoryService } from './services/category.service';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from '../+authorization/authorization/authorization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './routes/home-routing.module';
import { CategoriesComponent } from './containers/categories/categories.component';
import { ProductService } from './services/product.service';
import { ProductListComponent } from './containers/product-list/product-list.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './containers/home/home.component';
import { CartService } from './services/cart.service';
import { CartComponent } from './containers/cart/cart.component';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  declarations: [
    CategoriesComponent,
    ProductListComponent,
    HomeComponent,
    CartComponent
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {
  public static forRoot(): ModuleWithProviders {
    return {
        ngModule: HomeModule,
        providers: [CategoryService, ProductService, CartService, OrderService],
    };
  }
 }
