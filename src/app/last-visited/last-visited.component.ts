import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ApixuService } from "../apixu.service";
import { NgForage } from 'ngforage';
import { Renderer2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-last-visited',
  templateUrl: './last-visited.component.html',
  styleUrls: ['./last-visited.component.css']
})
export class LastVisitedComponent implements OnInit {
  lightmode: boolean = false;
  public weatherData: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apixuService: ApixuService,
    private readonly ngf: NgForage,
    private renderer: Renderer2) { }

    public getItem<T = any>(key: string): Promise<T> {
      return this.ngf.getItem<T>(key);
    }

  ngOnInit(): void {

    this.getItem<string>('stad').then(value =>     
      this.route.paramMap.subscribe((params: ParamMap) => {
      this.apixuService
        .getWeather(value).subscribe(data => {
          this.weatherData = data;
          console.log(this.weatherData);
        }
        );
    }));

  }
  themeSelection: BehaviorSubject<string> = new BehaviorSubject<string>('bootstrap');

  setTheme(theme: string) {
    this.themeSelection.next(theme);
  }

  themeChanges(): Observable<string> {
    return this.themeSelection.asObservable();
  }
}
