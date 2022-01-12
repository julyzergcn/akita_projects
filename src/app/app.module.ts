import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {
  NG_ENTITY_SERVICE_CONFIG
} from '@datorama/akita-ng-entity-service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: {
        baseUrl: environment.baseUrl
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
