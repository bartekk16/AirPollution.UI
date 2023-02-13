import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Weather } from '../models/Weather';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrlApi: string = environment.baseUrlApi;
  weatherUrl: string = 'https://api.openweathermap.org/data/2.5/forecast';
  apiKey = 'exampleapikey';

  constructor(private http: HttpClient) { }

  getInt(): Observable<number>{
    return this.http.get<number>(this.baseUrlApi + '/api/Home')
  }

  postInt(testNumber: number): Observable<number>{
    return this.http.post<number>(this.baseUrlApi + '/api/Home', testNumber)
  }

  getWeatherDataByCoords(lat: number, lon:number): Observable<any>{
    let params =new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('appid', this.apiKey)

    return this.http.get<any>(this.weatherUrl, {params});
  }

  getWeatherByCityName(city: string){
    let params =new HttpParams()
    .set('q', city)
    .set('units', 'metric')
    .set('appid', this.apiKey)

    return this.http.get<any>(this.weatherUrl, {params});
  }

  sendWeather(weather: Array<Weather>): Observable<Array<Weather>>{
    return this.http.post<Array<Weather>>(this.baseUrlApi + '/api/Weather', weather);
  }
}
