import { AUTO_STYLE } from "@angular/animations";

export class Weather {
  date: string;
  temperature: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    airPollution: number;
  constructor(
    date: string,
    temperature: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    airPollution: number){
      this.date = date;
      this.temperature = temperature;
      this.humidity = humidity;
      this.pressure = pressure;
      this.windSpeed = windSpeed;
      this.airPollution = airPollution;
    }
}
