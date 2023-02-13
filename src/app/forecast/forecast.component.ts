import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Weather } from '../models/Weather';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../MyErrorStateMatcher';
import { FileUploadComponent } from '../file-upload/file-upload.component';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  lat: number =0;
  lon: number =0;
  weather: any;
  weatherArray: Array<any> = new Array;

  @ViewChild ('upload') upload: FileUploadComponent | undefined;

  airPollutionArray: Array<Weather> = new Array();

  matcher = new MyErrorStateMatcher();
  city: string = "Dąbrowa Szlachecka";

  constructor(private weatherService: HomeService) { }

  ngOnInit(): void {

  }

  getWeatherByCityName(city: string){
    this.weatherService.getWeatherByCityName(city).subscribe(
      data =>{
        this.weather = data;
        this.filterWeather();
      }
    );
  }

  saveCity(){
    this.airPollutionArray = new Array();
    this.getWeatherByCityName(this.city);
    console.log(this.city);
  }

  filterWeather(){
    for(let i = 1; i<5; i++){
      let now = new Date();
      now = new Date(now.setDate(now.getDate()+i));
      let today = now.toISOString().split('T')[0];
      let weatherObject = new Weather('', 0, 0, 0,0, 0);
      weatherObject.date = today;
      weatherObject.temperature = Number(((this.weather.list.filter((w: any) => w.dt_txt == today + " 00:00:00")[0].main.temp + this.weather.list.filter((w: any) => w.dt_txt == today + " 03:00:00")[0].main.temp +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 06:00:00")[0].main.temp + this.weather.list.filter((w: any) => w.dt_txt == today + " 09:00:00")[0].main.temp +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 12:00:00")[0].main.temp + this.weather.list.filter((w: any) => w.dt_txt == today + " 15:00:00")[0].main.temp +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].main.temp + this.weather.list.filter((w: any) => w.dt_txt == today + " 21:00:00")[0].main.temp) / 8).toFixed(2));

      weatherObject.humidity = Number(((this.weather.list.filter((w: any) => w.dt_txt == today + " 00:00:00")[0].main.humidity + this.weather.list.filter((w: any) => w.dt_txt == today + " 03:00:00")[0].main.humidity +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 06:00:00")[0].main.humidity + this.weather.list.filter((w: any) => w.dt_txt == today + " 09:00:00")[0].main.humidity +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 12:00:00")[0].main.humidity + this.weather.list.filter((w: any) => w.dt_txt == today + " 15:00:00")[0].main.humidity +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].main.humidity + this.weather.list.filter((w: any) => w.dt_txt == today + " 21:00:00")[0].main.humidity) / 8).toFixed(2));

      weatherObject.pressure = Number(((this.weather.list.filter((w: any) => w.dt_txt == today + " 00:00:00")[0].main.pressure + this.weather.list.filter((w: any) => w.dt_txt == today + " 03:00:00")[0].main.pressure +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 06:00:00")[0].main.pressure + this.weather.list.filter((w: any) => w.dt_txt == today + " 09:00:00")[0].main.pressure +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 12:00:00")[0].main.pressure + this.weather.list.filter((w: any) => w.dt_txt == today + " 15:00:00")[0].main.pressure +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].main.pressure + this.weather.list.filter((w: any) => w.dt_txt == today + " 21:00:00")[0].main.pressure) / 8).toFixed(2));

      weatherObject.windSpeed = Number(((this.weather.list.filter((w: any) => w.dt_txt == today + " 00:00:00")[0].wind.speed + this.weather.list.filter((w: any) => w.dt_txt == today + " 03:00:00")[0].wind.speed +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 06:00:00")[0].wind.speed + this.weather.list.filter((w: any) => w.dt_txt == today + " 09:00:00")[0].wind.speed +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 12:00:00")[0].wind.speed + this.weather.list.filter((w: any) => w.dt_txt == today + " 15:00:00")[0].wind.speed +
      this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].wind.speed + this.weather.list.filter((w: any) => w.dt_txt == today + " 21:00:00")[0].wind.speed) / 8).toFixed(2));

      this.airPollutionArray.push(weatherObject);
    }

    this.getProcessedData();

  }

  getProcessedData(){
      this.weatherService.sendWeather(this.airPollutionArray).subscribe( data => {
      this.airPollutionArray = data;
    });
  }

  clearArrayAfterReadingCsv(){
    this.airPollutionArray = new Array<Weather>();
  }

}
