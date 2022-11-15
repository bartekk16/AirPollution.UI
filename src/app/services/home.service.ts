import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrlApi: string = environment.baseUrlApi;
  weatherUrl: string = 'api.openweathermap.org/data/2.5/forecast/daily?lat44.34&lon=10.99&cnt=7&appid=b5746da7fe201705479454cc6aa97e5c';
  apiKey = 'b5746da7fe201705479454cc6aa97e5c';

  constructor(private http: HttpClient) { }

  getInt(): Observable<number>{
    return this.http.get<number>(this.baseUrlApi + '/api/Home')
  }

  postInt(testNumber: number): Observable<number>{
    return this.http.post<number>(this.baseUrlApi + '/api/Home', testNumber)
  }

  getWeatherDataByCoords(): Observable<any>{
    // let params =new HttpParams()
    // .set('lat', lat)
    // .set('lon', lon)
    // .set('cnt', 7)
    // .set('appid', this.apiKey)

    return this.http.get<any>('https://api.openweathermap.org/data/2.5/forecast?lat=50.0833&lon=19.9167&appid=b5746da7fe201705479454cc6aa97e5c');
  }
}
//"http://localhost:4200/api.openweathermap.org/data/2.5/forecast/daily?lat=50&lon=20&cnt=7&appid=b5746da7fe201705479454cc6aa97e5c"
