import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-widget-weather-component',
  templateUrl: './widget-weather.component.html',
  styleUrls: ['./widget-weather.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetWeatherComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

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

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperature',
        fill: true,
        tension: 0.5,
        borderColor: 'rgba(189,221,167,255)',
        backgroundColor: 'transparent'
      }
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        display: true,
        beginAtZero: true,
        suggestedMax: 25,
      },
    }
  };
  public lineChartLegend = true;

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
          let formDate = date.getDate()+"/"+(date.getMonth()+1);
          this.listOfDates.push(formDate);
        });

        this.lineChartData.labels = this.listOfDates;
        this.lineChartData.datasets[0].data = this.listOfTempsDay;
        this.chart.update();
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
