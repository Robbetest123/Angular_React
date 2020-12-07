import { Routes } from '@angular/router'
import { LastVisitedComponent } from './last-visited/last-visited.component';
import { WeatherComponent } from './weather/weather.component';

export const allAppRoutes: Routes = [
  { path: 'weather-component/:stad', component: WeatherComponent },
  { path: 'last', component: LastVisitedComponent }
];