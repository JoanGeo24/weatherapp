import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private api: HttpClient
  ) { }

  public getWeatherData() {
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=40.58725980318928&lon=22.948223362612612&exclude=hourly,minutely&appid=11b0499bd13ab56063de7565a440eb97&units=metric';

    return this.api.get(url);
  }
}
