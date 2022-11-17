import { AUTO_STYLE } from "@angular/animations";

export class Weather {
  Date: string;
  Temperature: number;
    Humidity: number;
    Pressure: number;
    WindSpeed: number;
    AirPollution: number;
  constructor(
    Date: string,
    Temperature: number,
    Humidity: number,
    Pressure: number,
    WindSpeed: number,
    AirPollution: number){
      this.Date = Date;
      this.Temperature = Temperature;
      this.Humidity = Humidity;
      this.Pressure = Pressure;
      this.WindSpeed = WindSpeed;
      this.AirPollution = AirPollution;
    }
}
