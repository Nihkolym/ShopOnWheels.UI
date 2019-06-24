import { StartPageComponent } from './containers/start-page.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from '../+authorization/authorization/authorization.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StartPageRoutingModule } from './routes/start-page-routing.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    StartPageRoutingModule,
  ],
  declarations: [
    AuthorizationComponent,
    StartPageComponent,
  ],
  entryComponents: [
    AuthorizationComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StartPageModule {
 }
