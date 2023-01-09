import { Component, OnInit } from '@angular/core';
import { Weather } from '../models/Weather';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-simulate-pollution',
  templateUrl: './simulate-pollution.component.html',
  styleUrls: ['./simulate-pollution.component.css']
})
export class SimulatePollutionComponent implements OnInit {

  weather: Weather = new Weather ("", 20, 60, 1020, 3, 0);
  weatherArray: Array<any> = new Array;


  airPollutionArray: Array<Weather> = new Array;

  constructor(private weatherService: HomeService) { }

  ngOnInit(): void {
    this.airPollutionArray.push(this.weather);
  }

  calculatePollution(): void{
    this.airPollutionArray = new Array();
    this.airPollutionArray.push(this.weather);

    this.weatherService.sendWeather(this.airPollutionArray).subscribe( data => {
    this.airPollutionArray = data;
    });
  }

}
