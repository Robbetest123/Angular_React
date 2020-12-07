import { Injectable } from '@angular/core';
import { NgForage } from 'ngforage';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({

  providedIn: 'root'

})

export class ThemeService {



  private lightmode = new BehaviorSubject<boolean>(false);



  constructor(private readonly ngf: NgForage,) {

    this.ngf.getItem<boolean>('lightmode').then(value => this.lightmode.next(value || false))

  }



  toggleTheme() {

    this.lightmode.next(!this.lightmode.getValue());

    this.ngf.setItem<boolean>('lightmode', this.lightmode.getValue());

  }



  getTheme(): Observable<boolean> {

    return this.lightmode.asObservable();

  }

}​​