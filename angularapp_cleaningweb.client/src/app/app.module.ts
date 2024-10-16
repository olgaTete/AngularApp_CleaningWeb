import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ServiceFormComponent } from './app.component';


@NgModule({
  declarations: [
    ServiceFormComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    HttpClientModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [ServiceFormComponent]
})
export class AppModule { }
