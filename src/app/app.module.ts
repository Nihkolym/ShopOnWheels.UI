import { HomeModule } from './features/+home/home.module';
import { CoreModule } from './core/core.module';
import { HttpGuard } from './core/guards/http.guard';
import { StartPageModule } from './features/+start-page/start-page.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ErrorStateMatcher } from '@angular/material';
import { FormErrorStateMatcher } from './shared/forms/error-matcher';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    StartPageModule,
    HomeModule.forRoot(),
    CoreModule.forRoot(),
    SharedModule.forRoot(),
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: FormErrorStateMatcher}, HttpGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
