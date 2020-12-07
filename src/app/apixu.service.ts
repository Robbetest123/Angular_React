import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {

  constructor(private http: HttpClient) {}

  getWeather(location: any){
      return this.http.get(
          'http://api.weatherstack.com/current?access_key=9152de531b880032bf7286fd58f40d21&query=' + location
      );
  }
}