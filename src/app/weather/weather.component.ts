import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApixuService } from "../apixu.service";
import { NgForage } from 'ngforage';
import { Renderer2 } from '@angular/core';
import { ThemeService } from '../services/theme.service';
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
  title = "Weer Gent"
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apixuService: ApixuService,
    private readonly ngf: NgForage,
    private themeService: ThemeService,
    private renderer: Renderer2) {
    this.themeService.getTheme().subscribe(theme => this.lightmode = theme)
  }

  public getItem<T = any>(key: string): Promise<T> {
    return this.ngf.getItem<T>(key);
  }

  ngOnInit(): void {

    this.ngf.setItem<Number>('key', 10);
    this.getItem<Number>('key').then(value => this.title += value);
    this.route.paramMap.subscribe((params: ParamMap) => {
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

  toggleTheme() {
    this.themeService.toggleTheme()
  }
}
