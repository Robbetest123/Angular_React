import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApixuService } from "../apixu.service";
import { NgForage } from 'ngforage';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class WeatherComponent implements OnInit {
  lightmode: boolean = false;
  public weatherData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apixuService: ApixuService,
    private readonly ngf: NgForage,
    private renderer: Renderer2) {
  }

  public getItem<T = any>(key: string): Promise<T> {
    return this.ngf.getItem<T>(key);
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
    this.ngf.setItem<string>('stad', params.get('stad') || '');
      this.apixuService
        .getWeather(params.get('stad')).subscribe(data => {
          this.weatherData = data;
          console.log(this.weatherData);
        }
        );
    })
  }
  themeSelection: BehaviorSubject<string> = new BehaviorSubject<string>('bootstrap');

  setTheme(theme: string) {
    this.themeSelection.next(theme);
  }

  themeChanges(): Observable<string> {
    return this.themeSelection.asObservable();
  }
}
