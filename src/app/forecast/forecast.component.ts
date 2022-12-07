import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../services/home.service';
import * as moment from 'moment';
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

  airPollutionArray: Array<Weather> = new Array;

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();
  city: string = "Dąbrowa Szlachecka";

  constructor(private weatherService: HomeService) { }

  ngOnInit(): void {

  }

  // getWeather(){
  //   this.weatherService.getWeatherDataByCoords(50.0833, 19.9167).subscribe(
  //     data =>{this.weather = data;
  //     console.log(this.weather);
  //   }
  //   );
  // }

  getWeatherByCityName(city: string){
    this.weatherService.getWeatherByCityName(city).subscribe(
      data =>{
        this.weather = data;
        //console.log(this.weather);
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

    //let today = now.toISOString().split('T')[0]
    for(let i = 1; i<5; i++){
      let now = new Date();
      now = new Date(now.setDate(now.getDate()+i));
      let today = now.toISOString().split('T')[0];
      let weatherObject = new Weather('', 0, 0, 0,0, 0);
      //this.weatherArray.push(this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0]); mozna pomyslec z includem ale to da pierwszy z brzegu   -------kom------
      //this.weatherArray.push(this.weather.list.filter((w: any) => w.dt_txt == today));

      //00 03 06 09 12 15 18 21
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

      //console.log(this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].main.humidity)
      //console.log(this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].main.pressure)
      //console.log(this.weather.list.filter((w: any) => w.dt_txt == today + " 18:00:00")[0].wind.speed)

      //this.weatherArray.push(this.weather.list.filter((w: any) => w.dt_txt.include(today)[0]));
      //this.weatherArray.push(weatherObject);
      this.airPollutionArray.push(weatherObject);
    }
    this.getProcessedData();

    //console.log(this.airPollutionArray);
    //console.log(this.weather)
    //this.prepareDataToProcessAirPollution();
  }

  // prepareDataToProcessAirPollution(){
  //     for(let i = 0; i < this.weatherArray.length; i++){
  //       let airPollutionHelper = new Weather("", 0, 0, 0, 0, 0);
  //       airPollutionHelper.date = this.weatherArray[i].dt_txt.split(' ')[0];
  //       airPollutionHelper.temperature = this.weatherArray[i].main.temp;
  //       airPollutionHelper.humidity = this.weatherArray[i].main.humidity;
  //       airPollutionHelper.pressure = this.weatherArray[i].main.pressure;
  //       airPollutionHelper.windSpeed = this.weatherArray[i].wind.speed;
  //       // let airPollution = 5024.301412231013 - 7.339425651482356 * airPollutionHelper.Temperature + 10.263605859685386 * airPollutionHelper.Humidity +
  //       //   2.0820297529109673 * airPollutionHelper.WindSpeed - 10.855031734371348 * airPollutionHelper.Pressure + 0.03213986421118295 * airPollutionHelper.Temperature * airPollutionHelper.Temperature -
  //       //   0.025099344879074614 * airPollutionHelper.Temperature * airPollutionHelper.Humidity + 0.06681425395830656 * airPollutionHelper.Temperature * airPollutionHelper.WindSpeed +
  //       //   0.006129988781735207 * airPollutionHelper.Temperature * airPollutionHelper.Pressure + 0.005267615168560225 * airPollutionHelper.Humidity * airPollutionHelper.Humidity -
  //       //   0.011370299638924747 * airPollutionHelper.Humidity * airPollutionHelper.WindSpeed - 0.010215669240611014 * airPollutionHelper.Humidity * airPollutionHelper.Pressure +
  //       //   0.02217828630041639 * airPollutionHelper.WindSpeed * airPollutionHelper.WindSpeed - 0.0034355757843065327 * airPollutionHelper.WindSpeed * airPollutionHelper.Pressure +
  //       //   0.005861825184940717 * airPollutionHelper.Pressure * airPollutionHelper.Pressure;
  //       //airPollutionHelper.AirPollution = Math.round(airPollution);
  //       this.airPollutionArray.push(airPollutionHelper);
  //     }
  //     this.getProcessedData();

  // }

  getProcessedData(){
      this.weatherService.sendWeather(this.airPollutionArray).subscribe( data => {
      this.airPollutionArray = data;
    });
  }



}
