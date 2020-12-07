import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { allAppRoutes } from './routes';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule } from "ngx-webstorage-service";
import {DEFAULT_CONFIG, NgForageOptions, NgForageConfig, Driver} from 'ngforage';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    StorageServiceModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(allAppRoutes),
    HttpClientModule,
  ],
  providers: [
    {
      provide: DEFAULT_CONFIG,
      useValue: {
        name: 'MyApp',
        driver: [ // defaults to indexedDB -> webSQL -> localStorage
          Driver.INDEXED_DB,
          Driver.LOCAL_STORAGE
        ]
      } as NgForageOptions
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }