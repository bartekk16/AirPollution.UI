import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import * as moment from 'moment';
import { Weather } from '../models/Weather';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  lat: number =0;
  lon: number =0;
  weather: any;
  weatherArray: Array<any> = new Array;

  airPollutionArray: Array<Weather> = new Array;

  constructor(private weatherService: HomeService) { }

  ngOnInit(): void {
    //this.nowTest();
    this.getWeatherByCityName("Dąbrowa Szlachecka");
    //this.filterWeather();
  }

  getWeather(){
    this.weatherService.getWeatherDataByCoords(50.0833, 19.9167).subscribe(
      data =>{this.weather = data;
      console.log(this.weather);
    }
    );
  }
  nowTest(){
    let now = new Date();
    now = new Date(now.setDate(now.getDate()+1));
    let today = now.toISOString().split('T')[0];
    console.log(today);
  }

  getWeatherByCityName(city: string){
    this.weatherService.getWeatherByCityName(city).subscribe(
      data =>{
        this.weather = data;
        //console.log(this.weather);
        this.filterWeather();
      }
    );
  }

  filterWeather(){

    //let today = now.toISOString().split('T')[0]
    for(let i = 0; i<5; i++){
      let now = new Date();
      now = new Date(now.setDate(now.getDate()+i));
      let today = now.toISOString().split('T')[0];
      this.weatherArray.push(this.weather.list.filter((w: any) => w.dt_txt == today + " 15:00:00")[0]);
    }
    this.prepareDataToProcessAirPollution();
  }

  prepareDataToProcessAirPollution(){
      for(let i = 0; i < this.weatherArray.length; i++){
        let airPollutionHelper = new Weather("", 0, 0, 0, 0, 0);
        airPollutionHelper.Date = this.weatherArray[i].dt_txt.split(' ')[0];
        airPollutionHelper.Temperature = this.weatherArray[i].main.temp;
        airPollutionHelper.Humidity = this.weatherArray[i].main.humidity;
        airPollutionHelper.Pressure = this.weatherArray[i].main.pressure;
        airPollutionHelper.WindSpeed = this.weatherArray[i].wind.speed;
        let airPollution = 5024.301412231013 - 7.339425651482356 * airPollutionHelper.Temperature + 10.263605859685386 * airPollutionHelper.Humidity +
          2.0820297529109673 * airPollutionHelper.WindSpeed - 10.855031734371348 * airPollutionHelper.Pressure + 0.03213986421118295 * airPollutionHelper.Temperature * airPollutionHelper.Temperature -
          0.025099344879074614 * airPollutionHelper.Temperature * airPollutionHelper.Humidity + 0.06681425395830656 * airPollutionHelper.Temperature * airPollutionHelper.WindSpeed +
          0.006129988781735207 * airPollutionHelper.Temperature * airPollutionHelper.Pressure + 0.005267615168560225 * airPollutionHelper.Humidity * airPollutionHelper.Humidity -
          0.011370299638924747 * airPollutionHelper.Humidity * airPollutionHelper.WindSpeed - 0.010215669240611014 * airPollutionHelper.Humidity * airPollutionHelper.Pressure +
          0.02217828630041639 * airPollutionHelper.WindSpeed * airPollutionHelper.WindSpeed - 0.0034355757843065327 * airPollutionHelper.WindSpeed * airPollutionHelper.Pressure +
          0.005861825184940717 * airPollutionHelper.Pressure * airPollutionHelper.Pressure;
        airPollutionHelper.AirPollution = Math.round(airPollution);
        this.airPollutionArray.push(airPollutionHelper);
      }
      console.log(this.airPollutionArray);
  }

}
