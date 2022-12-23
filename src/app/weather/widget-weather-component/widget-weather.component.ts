import {Component, ViewEncapsulation} from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-widget-weather-component',
  templateUrl: './widget-weather.component.html',
  styleUrls: ['./widget-weather.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetWeatherComponent {
  public weatherData: any;
  public currentTemp: any;
  public currentTempFeelsLike: any;
  public isSelected = {
    now: true,
    date: false,
    today: false,
  }
  public nextDaysWeather: any;
  public listOfDates: any[] = [];
  public daysTemperatures: any;
  public nightsTemperatures: any;
  public listOfTempsDay: any[] = [];
  public listOfTempsNight: any[] = [];
  public selectedDay: any;
  public daysTempFeelLike: any;
  public nightsTempFeelLike: any;
  public listOfTempFeelLikeDay: any[] = [];
  public listOfTempFeelLikeNight: any[] = [];


  constructor(
    private weatherService: WeatherService,
  ) {

    this.getWeatherData();
  }

  public getWeatherData(): void {
    this.weatherService
      .getWeatherData()
      .subscribe(data => {
        this.weatherData = data;
        this.currentTemp = Math.ceil(this.weatherData?.current?.temp);
        this.currentTempFeelsLike = Math.ceil(this.weatherData?.current?.feels_like);
        this.nextDaysWeather = this.weatherData.daily;

        console.log(this.weatherData);

        for (let temp of this.nextDaysWeather) {
          this.daysTemperatures = Math.ceil(temp.temp.day);
          this.nightsTemperatures = Math.ceil(temp.temp.night);
          this.daysTempFeelLike = Math.ceil(temp.feels_like.day);
          this.nightsTempFeelLike = Math.ceil(temp.feels_like.night);

          this.listOfTempsDay.push(this.daysTemperatures);
          this.listOfTempsNight.push(this.nightsTemperatures);
          this.listOfTempFeelLikeDay.push(this.daysTempFeelLike);
          this.listOfTempFeelLikeNight.push(this.nightsTempFeelLike);
        }

        this.nextDaysWeather.forEach((element: { dt: any; }) => {
          let date = new Date(element.dt * 1000);
          let formDate = date.getDate()+"/"+(date.getMonth()+1)+ "/"+date.getFullYear();
          this.listOfDates.push(formDate);
        });
      });
  }

  public onSelectNow(): void {
    this.isSelected.now = true;
    this.isSelected.date = false;
    this.isSelected.today = false;
  }

  public onSelectToday(): void {
    this.isSelected.now = false;
    this.isSelected.date = false;
    this.isSelected.today = true;
  }

  public onSelectDate(index:any): void {
    this.isSelected.now = false;
    this.isSelected.date = true;
    this.isSelected.today = false;

    this.selectedDay = index;
  }
}
