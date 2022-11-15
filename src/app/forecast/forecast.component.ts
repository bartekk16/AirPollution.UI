import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  lat :number =0;
  lon :number =0;
  weather :any;

  constructor(private weatherService: HomeService) { }

  ngOnInit(): void {
    this.getLocation();
    //this.getweather();
  }

  getweather(){
    fetch('https://api.openweathermap.org/data/2.5/forecast?lat=50.0833&lon=19.9167&appid=b5746da7fe201705479454cc6aa97e5c').then(response => response.json()).then(data=> {console.log(data)});
  }

  getLocation(){
    this.weatherService.getWeatherDataByCoords().subscribe(
      data =>{
        console.log((data.list[0].main.humidity));
      }
    );
  }

}
